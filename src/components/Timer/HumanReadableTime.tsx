import { humanReadableTime } from "../../lib/format";

interface HumanReadableTimeProps {
  penalty: number;
  time: number;
  compact?: boolean;
}

const displayPenalty = (value: number) => (
  <span className="text-red-300 pl-2">(+{value / 1000})</span>
);

const HumanReadableTime = (props: HumanReadableTimeProps) => {
  const { compact, penalty, time } = props;

  if (compact && penalty) {
    return (
      <>
        <span className="text-red-300">
          {humanReadableTime(time + penalty)}
        </span>
      </>
    );
  }

  return (
    <>
      {humanReadableTime(time + penalty)}
      {!!penalty && displayPenalty(penalty)}
    </>
  );
};

export default HumanReadableTime;
