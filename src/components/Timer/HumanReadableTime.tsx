import { humanReadableTime } from "../../lib/format";

interface HumanReadableTimeProps {
  compact?: boolean;
  initialValue?: string;
  penalty: number;
  time: number;
}

const displayPenalty = (value: number) => (
  <span className="text-red-300 pl-2">(+{value / 1000})</span>
);

const HumanReadableTime = (props: HumanReadableTimeProps) => {
  const { compact, initialValue, penalty, time } = props;

  if (compact && penalty) {
    return (
      <>
        <span className="text-red-300">
          {humanReadableTime(time + penalty, initialValue)}
        </span>
      </>
    );
  }

  return (
    <>
      {humanReadableTime(time + penalty, initialValue)}
      {!!penalty && displayPenalty(penalty)}
    </>
  );
};

export default HumanReadableTime;
