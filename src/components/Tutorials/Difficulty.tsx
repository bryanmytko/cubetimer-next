const LABELS = ["", "Easy", "Approachable", "Moderate", "Challenging", "Expert"];

const Difficulty = ({ level }: { level: number }) => (
  <span className="inline-flex items-center gap-2 text-xs text-neutral-400">
    <span className="flex gap-1" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-4 rounded-full ${i <= level ? "bg-yellow-300" : "bg-neutral-700"}`}
        />
      ))}
    </span>
    {LABELS[level]}
  </span>
);

export default Difficulty;
