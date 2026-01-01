export interface DadJoke {
  id: number;
  setup: string;
  punchline: string;
}

export const dadJokes: DadJoke[] = [
  {
    id: 1,
    setup: "Why don't scientists trust atoms?",
    punchline: "Because they make up everything!"
  },
  {
    id: 2,
    setup: "What do you call a fake noodle?",
    punchline: "An impasta!"
  },
  {
    id: 3,
    setup: "Why did the scarecrow win an award?",
    punchline: "Because he was outstanding in his field!"
  },
  {
    id: 4,
    setup: "I'm reading a book about anti-gravity...",
    punchline: "It's impossible to put down!"
  },
  {
    id: 5,
    setup: "Why don't eggs tell jokes?",
    punchline: "They'd crack each other up!"
  },
  {
    id: 6,
    setup: "What do you call a bear with no teeth?",
    punchline: "A gummy bear!"
  },
  {
    id: 7,
    setup: "I used to hate facial hair...",
    punchline: "But then it grew on me."
  },
  {
    id: 8,
    setup: "Why did the bicycle fall over?",
    punchline: "Because it was two-tired!"
  },
  {
    id: 9,
    setup: "What's orange and sounds like a parrot?",
    punchline: "A carrot!"
  },
  {
    id: 10,
    setup: "I'm afraid for the calendar...",
    punchline: "Its days are numbered."
  },
  {
    id: 11,
    setup: "Why do fathers take an extra pair of socks when they go golfing?",
    punchline: "In case they get a hole in one!"
  },
  {
    id: 12,
    setup: "What do you call cheese that isn't yours?",
    punchline: "Nacho cheese!"
  },
  {
    id: 13,
    setup: "Why couldn't the leopard play hide and seek?",
    punchline: "Because he was always spotted!"
  },
  {
    id: 14,
    setup: "I only know 25 letters of the alphabet...",
    punchline: "I don't know Y."
  },
  {
    id: 15,
    setup: "What did the ocean say to the beach?",
    punchline: "Nothing, it just waved."
  },
  {
    id: 16,
    setup: "Why do bees have sticky hair?",
    punchline: "Because they use honeycombs!"
  },
  {
    id: 17,
    setup: "What do you call a fish without eyes?",
    punchline: "A fsh!"
  },
  {
    id: 18,
    setup: "I'm on a seafood diet...",
    punchline: "I see food and I eat it."
  },
  {
    id: 19,
    setup: "Why did the coffee file a police report?",
    punchline: "It got mugged!"
  },
  {
    id: 20,
    setup: "What do you call a sleeping dinosaur?",
    punchline: "A dino-snore!"
  }
];

export function getRandomJoke(excludeId?: number): DadJoke {
  const availableJokes = excludeId 
    ? dadJokes.filter(joke => joke.id !== excludeId)
    : dadJokes;
  return availableJokes[Math.floor(Math.random() * availableJokes.length)];
}
