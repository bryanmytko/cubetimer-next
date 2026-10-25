const LABELS = ["", "Easy", "Approachable", "Moderate", "Challenging", "Expert"];

// Green for easy puzzles, yellow for moderate, red for hard
const color = (level: number) => {
  if (level <= 2) return { bar: "bg-emerald-400", text: "text-emerald-300" };
  if (level === 3) return { bar: "bg-yellow-300", text: "text-yellow-300" };
  return { bar: "bg-red-400", text: "text-red-300" };
};

const Difficulty = ({ level }: { level: number }) => {
  const { bar, text } = color(level);

  return (
    <span className={`inline-flex items-center gap-2 text-xs ${text}`}>
      <span className="flex gap-1" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`h-1.5 w-4 rounded-full ${i <= level ? bar : "bg-neutral-700"}`}
          />
        ))}
      </span>
      {LABELS[level]}
    </span>
  );
};

export default Difficulty;
