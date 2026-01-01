import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReactionBarProps {
  onReact: (reaction: string) => void;
}

const reactions = [
  { emoji: "😂", label: "Hilarious", value: "hilarious" },
  { emoji: "😄", label: "Good one", value: "good" },
  { emoji: "😐", label: "Meh", value: "meh" },
  { emoji: "🙄", label: "Groan", value: "groan" },
];

export function ReactionBar({ onReact }: ReactionBarProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [animating, setAnimating] = useState<string | null>(null);

  const handleReact = (value: string) => {
    setAnimating(value);
    setSelected(value);
    onReact(value);
    setTimeout(() => setAnimating(null), 500);
  };

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      <span className="text-sm font-medium text-muted-foreground mr-2">
        Rate this joke:
      </span>
      <div className="flex gap-2">
        {reactions.map((reaction) => (
          <Button
            key={reaction.value}
            variant="ghost"
            size="sm"
            onClick={() => handleReact(reaction.value)}
            className={cn(
              "flex flex-col items-center p-2 h-auto transition-all duration-200 hover:bg-blush rounded-xl",
              selected === reaction.value && "bg-blush ring-2 ring-coral/30",
              animating === reaction.value && "animate-wiggle"
            )}
          >
            <span className="text-2xl md:text-3xl">{reaction.emoji}</span>
            <span className="text-[10px] md:text-xs text-muted-foreground mt-1 hidden md:block">
              {reaction.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
