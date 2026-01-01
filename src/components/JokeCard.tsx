import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface JokeCardProps {
  setup: string;
  punchline: string;
  onNext: () => void;
}

export function JokeCard({ setup, punchline, onNext }: JokeCardProps) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleNext = () => {
    setRevealed(false);
    onNext();
  };

  return (
    <Card className="w-full max-w-lg bg-gradient-card shadow-lifted border-0 overflow-hidden">
      <CardContent className="p-8 space-y-6">
        {/* Setup */}
        <div className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            The Setup
          </span>
          <p className="font-display text-2xl md:text-3xl font-semibold text-foreground leading-snug">
            {setup}
          </p>
        </div>

        {/* Punchline Area */}
        <div className="min-h-[100px] flex items-center justify-center">
          {revealed ? (
            <div className="animate-scale-in space-y-2 text-center">
              <span className="text-xs font-medium uppercase tracking-wider text-coral">
                The Punchline
              </span>
              <p className="font-display text-xl md:text-2xl font-bold text-primary">
                {punchline}
              </p>
            </div>
          ) : (
            <Button
              onClick={handleReveal}
              className="group relative px-8 py-6 text-lg font-display font-semibold bg-gradient-warm hover:shadow-glow transition-all duration-300 hover:scale-105 border-0"
            >
              <span className="relative z-10">Tell me! 🤭</span>
            </Button>
          )}
        </div>

        {/* Next Button */}
        {revealed && (
          <div className="animate-fade-up flex justify-center pt-4">
            <Button
              onClick={handleNext}
              variant="secondary"
              className="font-display font-medium hover:bg-secondary/80 transition-colors"
            >
              Another one! 🔄
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
