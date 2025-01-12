const humanReadableTime = (t: number, initialValue?: string): string => {
  if (!t) return initialValue || "--";

  let str = "";

  if (t > 60000) {
    str += `${Math.floor((t / 60000) % 60)}:`;
    str += `${Math.floor((t / 1000) % 60)
      .toString()
      .padStart(2, "0")}:`;
    str += Math.floor((t / 10) % 100)
      .toString()
      .padStart(2, "0");
    return str;
  }

  str += `${Math.floor((t / 1000) % 60)}:`;
  str += Math.floor((t / 10) % 100)
    .toString()
    .padStart(2, "0");

  return str;
};

const formatDate = (input: string) => new Date(input).toLocaleDateString();

export { humanReadableTime, formatDate };
