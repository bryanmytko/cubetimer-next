import { useQuery } from "@apollo/client";

import { humanReadableTime } from "../../lib/format";
import type { Solve } from "@prisma/client";
import { SOLVES_FOR_USER } from "../../graphql/queries";
import { useSession } from "next-auth/react";

const Statistics = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const { data } = useQuery(SOLVES_FOR_USER, {
    skip: !session,
    variables: { userId },
  });

  return (
    <div className="container text-white statistics-container">
      <h1 className="text-3xl">Statistics</h1>
      {data &&
        data.solves.map((d: Solve) => {
          return (
            <p key={d.id}>
              {humanReadableTime(parseInt(d.time))}:{" "}
              <code className="inline">{d.scramble}</code>
            </p>
          );
        })}
    </div>
  );
};

export default Statistics;
