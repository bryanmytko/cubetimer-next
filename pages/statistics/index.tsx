import { useQuery } from "@apollo/client";

import { humanReadableTime } from "../../lib/format";
import type { Solve } from "@prisma/client";
import { SOLVES_FOR_USER } from "../../graphql/queries";

const Statistics = () => {
  const { data, loading, error } = useQuery(SOLVES_FOR_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="container text-white statistics-container">
      <h1 className="text-3xl">Statistics</h1>
      {data.solves.map((d: Solve) => {
        return (
          <p key={d.id}>
            {humanReadableTime(parseInt(d.time))}:{" "}
            <pre className="inline">{d.scramble}</pre>
          </p>
        );
      })}
    </div>
  );
};

export default Statistics;
