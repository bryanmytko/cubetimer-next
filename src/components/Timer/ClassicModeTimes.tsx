import { HumanReadableTime } from "./";
import { Solve } from "../../types/timer";

interface ClassicModeTimesProps {
  solveTimes: Solve[];
}

const ClassicModeTimes = (props: ClassicModeTimesProps) => {
  const { solveTimes } = props;
  return (
    <div className="content-center w-8/12 mx-auto">
      <ol className="grid grid-cols-6 mt-5 text-xl text-gray-300 lg:grid-cols-12 content-evenly">
        {solveTimes.map((solve: Solve, index: number) => (
          <li key={index} id={String(index)} className="pr-2">
            <HumanReadableTime
              time={solve.time}
              penalty={solve.penalty}
              compact={true}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ClassicModeTimes;
