# Substack Exa Search

A powerful search interface for Substack posts using the Exa AI API. Search across thousands of Substack publications to find relevant content on any topic.

![Substack Exa Search](https://via.placeholder.com/800x400/254bf1/ffffff?text=Substack+Exa+Search)

## Features

- 🔍 **Intelligent Search**: Powered by Exa AI's semantic search capabilities
- 📰 **Substack-Focused**: Specifically searches across Substack publications
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- ⚡ **Fast Results**: Real-time search with loading states
- 💡 **Search Suggestions**: Pre-built topic suggestions to get you started
- 📱 **Mobile-Friendly**: Fully responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- An Exa API key (get one at [dashboard.exa.ai](https://dashboard.exa.ai/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/exa-labs/substack-exa-search.git
   cd substack-exa-search
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   EXA_API_KEY=your_exa_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

1. **Search**: Enter any topic or question in the search bar
2. **Explore Suggestions**: Click on one of the popular topic cards to get started
3. **Browse Results**: Click on any search result to read the full Substack post
4. **Discover More**: Use the additional suggestions below results to explore related topics

### Example Searches

- "artificial intelligence machine learning trends"
- "startup funding venture capital investment trends"
- "climate change sustainability environment solutions"
- "web3 cryptocurrency blockchain bitcoin ethereum"

## API Configuration

The app uses the Exa API to search specifically across Substack domains. The search is configured to:

- Use keyword-based search with autoprompt
- Return 10 results per query
- Include full text content for better summaries
- Filter results to Substack domains only

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **API**: Exa AI Search API
- **Deployment**: Vercel-ready

## Project Structure

```
substack-exa-search/
├── app/
│   ├── api/substack-search/    # API route for Exa search
│   ├── fonts/                  # Custom fonts (ABCDiatype, Reckless)
│   ├── globals.css            # Global styles and design tokens
│   ├── layout.tsx             # Root layout with font configuration
│   └── page.tsx               # Main page component
├── components/
│   ├── ui/
│   │   ├── ResultsLoadingSkeleton.tsx
│   │   └── SearchSuggestions.tsx
│   ├── SubstackCard.tsx       # Individual result card
│   └── SubstackFinder.tsx     # Main search component
└── tailwind.config.ts         # Tailwind configuration
```

## Customization

### Colors
The app uses a custom color palette defined in `globals.css`. Main brand colors:
- Primary: `#254bf1` (brand-default)
- Secondary: `#faf7ec` (secondary-default)
- Accent: `#9f9672` (secondary-accent)

### Fonts
- **ABCDiatype**: Modern sans-serif for body text
- **Reckless**: Elegant serif for headings

### Search Configuration
Modify the search parameters in `app/api/substack-search/route.ts`:
- `numResults`: Number of results to return
- `includeDomains`: Domains to search (currently just Substack)
- `type`: Search type ('keyword' or 'neural')

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Exa API Documentation](https://docs.exa.ai/)
- 💬 [Exa Discord Community](https://discord.gg/jvz7GS9W8Y)
- 🐛 [Report Issues](https://github.com/exa-labs/substack-exa-search/issues)

---

Built with ❤️ using [Exa AI](https://exa.ai/) and [Next.js](https://nextjs.org/)