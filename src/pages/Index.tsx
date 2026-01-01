import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { JokeCard } from "@/components/JokeCard";
import { ReactionBar } from "@/components/ReactionBar";
import { JokeCounter } from "@/components/JokeCounter";
import { getRandomJoke, DadJoke } from "@/data/jokes";

const Index = () => {
  const [currentJoke, setCurrentJoke] = useState<DadJoke>(() => getRandomJoke());
  const [jokeCount, setJokeCount] = useState(0);

  const handleNextJoke = useCallback(() => {
    setCurrentJoke(prev => getRandomJoke(prev.id));
    setJokeCount(prev => prev + 1);
  }, []);

  const handleReaction = useCallback((reaction: string) => {
    console.log(`User reacted with: ${reaction}`);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 gap-8">
      {/* Header */}
      <Header />

      {/* Main Joke Card */}
      <main className="w-full flex flex-col items-center gap-6">
        <JokeCard
          setup={currentJoke.setup}
          punchline={currentJoke.punchline}
          onNext={handleNextJoke}
        />

        {/* Reaction Bar */}
        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <ReactionBar onReact={handleReaction} />
        </div>
      </main>

      {/* Footer Stats */}
      <footer className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
        <JokeCounter count={jokeCount} />
      </footer>

      {/* Decorative Elements */}
      <div className="fixed bottom-4 left-4 text-4xl opacity-20 animate-float pointer-events-none">
        😄
      </div>
      <div className="fixed top-20 right-8 text-3xl opacity-15 animate-float pointer-events-none" style={{ animationDelay: "1s" }}>
        🤣
      </div>
      <div className="fixed bottom-32 right-4 text-2xl opacity-10 animate-float pointer-events-none" style={{ animationDelay: "2s" }}>
        😆
      </div>
    </div>
  );
};

export default Index;
