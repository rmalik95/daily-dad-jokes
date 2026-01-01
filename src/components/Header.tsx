export function Header() {
  return (
    <header className="text-center space-y-4 animate-fade-up">
      <div className="inline-flex items-center gap-3">
        <span className="text-5xl md:text-6xl animate-float">👴</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
          Dad Jokes
          <span className="text-primary"> Daily</span>
        </h1>
      </div>
      <p className="text-muted-foreground font-body text-lg max-w-md mx-auto">
        Your daily dose of eye-roll-worthy humor. 
        <br />
        <span className="text-coral font-medium">Warning: groans expected.</span>
      </p>
    </header>
  );
}
