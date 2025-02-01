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

  const solveData = data.solves.edges
    .map(({ node }: any) => ({
      time: parseInt(humanReadableTime(parseInt(node.time))),
      date: formatDate(node.createdAt),
    }))
    .reverse();

  console.log(solveData.length);

  return (
    <ResponsiveContainer width="100%" aspect={10.0 / 3.0}>
      <LineChart width={900} height={400} data={solveData}>
        <Line dataKey="time" stroke="#8884d8" />
        <CartesianGrid stroke="#444" strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="time" />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SolveChart;
