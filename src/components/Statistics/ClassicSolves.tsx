import type { Solve } from "@prisma/client";

import { Solves } from "./";

interface ClassicSolvesProps {
  data?: SolveSession[];
}

interface SolveSession {
  id: string;
  solves?: Solve[];
}

const ClassicSolves = (props: ClassicSolvesProps) => {
  const { data } = props;
  if (!data) return <div>No classic mode sessions found.</div>;

  return (
    <>
      {data.map((session: SolveSession) => {
        return (
          <div key={session.id}>
            {/* <h3 className="text-xl text-white">Session ${session.id}</h3> */}
            <Solves data={session.solves} />
          </div>
        );
      })}
    </>
  );
};

export default ClassicSolves;
