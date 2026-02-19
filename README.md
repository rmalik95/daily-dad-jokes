# 😄 Daily Dad Jokes

> Your daily dose of eye-roll-worthy humor. Warning: groans expected.

A delightful, interactive web application that serves up the finest collection of dad jokes. Built with modern web technologies, featuring smooth animations, beautiful UI, and an engaging user experience that will make you laugh (or groan) one joke at a time.

![Daily Dad Jokes](https://img.shields.io/badge/Daily-Dad%20Jokes-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.3-purple?style=flat-square&logo=vite)

---

## ✨ Features

- 🎲 **Random Joke Generator** - Get a fresh dad joke every time you click
- 🎭 **Interactive Reveal** - Click to reveal the punchline for maximum comedic effect
- 😂 **Reaction System** - Rate jokes with emoji reactions (Hilarious, Good one, Meh, or Groan)
- 📊 **Joke Counter** - Track how many jokes you've enjoyed
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 📱 **Mobile-First** - Fully responsive and optimized for all devices
- ⚡ **Fast & Lightweight** - Built with Vite for lightning-fast performance
- 🔒 **Security-First** - Comprehensive security headers and best practices

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.x or higher ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/daily-dad-jokes.git
   cd daily-dad-jokes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:8080`
   - Start enjoying some dad jokes! 😄

---

## 📖 Usage

### Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint
```

### How It Works

1. **View a Joke** - The app loads with a random dad joke setup
2. **Reveal Punchline** - Click the "Tell me! 🤭" button to reveal the punchline
3. **React** - Use the reaction buttons to rate the joke (😂 😄 😐 🙄)
4. **Get Another** - Click "Another one! 🔄" to get a new random joke
5. **Track Progress** - Watch your joke counter increase as you explore!

---

## 🛠️ Tech Stack

### Core Technologies
- **[Vite](https://vitejs.dev/)** - Next-generation frontend build tool
- **[React](https://react.dev/)** 18.3 - UI library
- **[TypeScript](https://www.typescriptlang.org/)** 5.8 - Type-safe JavaScript
- **[React Router](https://reactrouter.com/)** - Client-side routing

### UI & Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-specific linting rules

---

## 📁 Project Structure

```
daily-dad-jokes/
├── public/                 # Static assets
│   ├── _headers           # Cloudflare Pages headers
│   ├── robots.txt         # SEO robots file
│   ├── sitemap.xml        # SEO sitemap
│   └── favicon.png        # Site favicon
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Header.tsx   # Site header
│   │   ├── JokeCard.tsx # Main joke card component
│   │   ├── ReactionBar.tsx # Emoji reaction buttons
│   │   └── JokeCounter.tsx # Joke counter display
│   ├── data/
│   │   └── jokes.ts      # Joke database
│   ├── pages/
│   │   ├── Index.tsx     # Home page
│   │   └── NotFound.tsx  # 404 page
│   ├── App.tsx           # Main app component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml   # CI/CD pipeline
├── DEPLOYMENT.md        # Deployment guide
├── SECURITY.md          # Security policies
└── vite.config.ts       # Vite configuration
```

---

## 🌐 Deployment

This project is configured for deployment on **Cloudflare Pages** with security headers and optimizations already set up.

### Quick Deploy to Cloudflare Pages

1. **Via Dashboard:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Pages → Create a project
   - Connect your Git repository
   - Build settings:
     - Framework preset: **Vite**
     - Build command: `npm run build`
     - Build output directory: `dist`

2. **Via Wrangler CLI:**
   ```bash
   npm install -g wrangler
   wrangler pages deploy dist --project-name=daily-dad-jokes
   ```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## 🔒 Security

This project follows security best practices:

- ✅ Security headers configured (CSP, HSTS, X-Frame-Options, etc.)
- ✅ No source maps in production builds
- ✅ Dependency security audits
- ✅ Secure build configuration

For more details, see [SECURITY.md](./SECURITY.md).

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-joke`)
3. **Add your jokes** to `src/data/jokes.ts`
4. **Commit your changes** (`git commit -m 'Add some amazing jokes'`)
5. **Push to the branch** (`git push origin feature/amazing-joke`)
6. **Open a Pull Request**

### Adding New Jokes

To add new dad jokes, edit `src/data/jokes.ts`:

```typescript
{
  id: 999,
  setup: "Why don't eggs tell jokes?",
  punchline: "They'd crack each other up!"
}
```

---

## 📝 Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on `http://localhost:8080` |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🎯 Roadmap

- [ ] Add joke categories/filtering
- [ ] Save favorite jokes
- [ ] Share jokes on social media
- [ ] Dark mode toggle
- [ ] Joke of the day feature
- [ ] User-submitted jokes
- [ ] Analytics integration

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- All the dads out there who keep the tradition of terrible jokes alive
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- The open-source community for amazing tools and libraries

---

## 💬 Support

Found a bug or have a suggestion? [Open an issue](https://github.com/yourusername/daily-dad-jokes/issues)!

---

**Made with ❤️ and lots of groans**

*Remember: The best dad jokes are the ones that make you groan the loudest!* 😄
