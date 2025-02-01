import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { SOLVES_FOR_USER } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { formatDate, humanReadableTime } from "../../lib/format";
import { fastestTime, slowestTime } from "../../lib/calculate";

const SESSIONS_PER_PAGE = 101;

interface ISolveChartProps {
  userId: string;
}

const SolveChart = ({ userId }: ISolveChartProps) => {
  const { loading, data, error, fetchMore } = useQuery(SOLVES_FOR_USER, {
    variables: { userId, first: SESSIONS_PER_PAGE },
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: "no-cache",
  });

  if (loading || !data) return <></>;

  const solveData = data.solves.edges;
  const times = solveData.map(
    ({ node }: { node: { time: number } }) => node.time,
  );

  const fastest = parseFloat(
    humanReadableTime(fastestTime(times)).replace(":", "."),
  );
  const slowest = parseFloat(
    humanReadableTime(slowestTime(times)).replace(":", "."),
  );

  const plots = solveData
    .map(({ node }: any) => ({
      time: parseFloat(
        humanReadableTime(parseInt(node.time)).replace(":", "."),
      ),
      date: formatDate(node.createdAt),
    }))
    .reverse();

  console.log(slowest - 2);

  return (
    <ResponsiveContainer width="100%" aspect={10.0 / 3.0} className="mb-10">
      <LineChart width={900} height={400} data={plots}>
        <Line dataKey="time" stroke="#8884d8" />
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
            solveData[0].node.createdAt,
            solveData[solveData.length - 1].node.createdAt,
          ]}
        />
        <YAxis
          dataKey="time"
          domain={[Math.round(fastest - 2), Math.round(slowest + 1)]}
          stroke="#facc17"
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SolveChart;
