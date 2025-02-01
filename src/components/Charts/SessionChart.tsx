import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { SOLVE_SESSIONS_FOR_USER } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { formatDate, humanReadableTime } from "../../lib/format";
import {
  averageCurved,
  averageOfSize,
  fastestTime,
  slowestTime,
} from "../../lib/calculate";
import { Solve, Session } from "../../types/timer";

const SESSIONS_PER_PAGE = 10;

interface ISolveChartProps {
  userId: string;
}

const SessionChart = ({ userId }: ISolveChartProps) => {
  const { loading, data } = useQuery(SOLVE_SESSIONS_FOR_USER, {
    variables: { userId, first: SESSIONS_PER_PAGE },
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: "no-cache",
  });

  if (loading || !data) return <></>;

  const sessionData = data.solveSessionsForUser.edges;

  const plots = sessionData
    .map(({ node }: { node: Session }) => {
      console.log("node.solves", node.solves[0].time);

      return {
        average: humanReadableTime(
          averageOfSize(
            node.solves.map(({ time }) => time),
            node.solves.length,
          ),
        ).replace(":", "."),
        averageCurved: humanReadableTime(
          averageCurved(
            node.solves.map(({ time }) => time),
            node.solves.length,
          ),
        ).replace(":", "."),
        date: formatDate(node.createdAt),
      };
    })
    .reverse();

  const sorted = plots.toSorted((a: any, b: any) => a.average - b.average);

  console.log(sorted[0], sorted[2]);

  return (
    <ResponsiveContainer width="100%" aspect={10.0 / 3.0} className="mb-10">
      <LineChart width={900} height={400} data={plots}>
        <Line dataKey="average" stroke="#2Ab" />
        <Line dataKey="averageCurved" stroke="#c29" />
        <CartesianGrid stroke="#444" strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          angle={30}
          minTickGap={10}
          stroke="#facc17"
          tick={{
            fontSize: "10px",
          }}
          range={[
            sessionData[0].node.createdAt,
            sessionData[sessionData.length - 1].node.createdAt,
          ]}
        />
        <YAxis
          dataKey="average"
          domain={[
            sorted[0].average - 2,
            sorted[sorted.length - 1].average + 2,
          ]}
          stroke="#facc17"
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SessionChart;
