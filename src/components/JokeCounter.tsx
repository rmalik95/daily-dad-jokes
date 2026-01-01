interface JokeCounterProps {
  count: number;
}

export function JokeCounter({ count }: JokeCounterProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full">
      <span className="text-lg">📊</span>
      <span className="font-display text-sm font-medium text-foreground">
        Jokes enjoyed today: <span className="text-primary font-bold">{count}</span>
      </span>
    </div>
  );
}
