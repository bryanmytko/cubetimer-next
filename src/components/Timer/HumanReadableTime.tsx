import { humanReadableTime } from "../../lib/format";

interface HumanReadableTimeProps {
  penalty: number;
  time: number;
}

const displayPenalty = (value: number) => (
  <span className="text-red-300 pl-2">(+{value / 1000})</span>
);

const HumanReadableTime = (props: HumanReadableTimeProps) => {
  const { penalty, time } = props;

  return (
    <span>
      {humanReadableTime(time + penalty)}
      {!!penalty && displayPenalty(penalty)}
    </span>
  );
};

export default HumanReadableTime;
