import { humanReadableTime } from "../../lib/format";

interface ClassicModeTimesProps {
  solveTimes: number[];
}

const ClassicModeTimes = (props: ClassicModeTimesProps) => {
  const { solveTimes } = props;
  return (
    <div className="content-center w-8/12 mx-auto">
      <ol className="grid grid-cols-12 mt-5 text-xl text-gray-300 content-evenly">
        {solveTimes.map((time: number, index: number) => (
          <li
            key={index}
            id={String(index)}
            className="inline px-4"
          >
            {humanReadableTime(time)}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ClassicModeTimes;
