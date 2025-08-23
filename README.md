# Search across Substack using Exa AI
### Powered by [Exa](https://exa.ai) - The Web Search API

App Link: https://substack-exa-search.vercel.app/

![Screenshot](https://substack-exa-search.vercel.app/opengraph-image.jpg)

<br>

## 🎯 What is Substack Search App?

Substack Search is a free web app that helps you search across thousands of Substack posts using AI. 

This app uses the Exa API to find relevant Substack posts on any topic, with smart summaries and easy browsing.

<br>

## 💻 Tech Stack
- **Search Engine API**: [Exa API](https://exa.ai) - Web search API designed for LLMs
- **Frontend**: [Next.js 14](https://nextjs.org/docs) with App Router, [TailwindCSS](https://tailwindcss.com), TypeScript

<br>

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Exa API key - [Get yours here](https://dashboard.exa.ai/api-keys)

### Installation

1. Clone the repository
```bash
git clone https://github.com/exa-labs/substack-exa-search.git
cd substack-exa-search
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```env
EXA_API_KEY=your_exa_api_key_here
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

<br>

## 🔑 Where to Get API Keys

- **Exa API Key**: [dashboard.exa.ai/api-keys](https://dashboard.exa.ai/api-keys) - For searching Substack posts

<br>

## ⭐ About [Exa](https://exa.ai)

This project is powered by [Exa.ai](https://exa.ai), a web search API designed specifically for AI applications. Exa provides:

- **AI-Optimized Search**: Search results relevant for language model consumption
- **Real-time Web Scraping**: Current website data with content extraction
- **Domain Filtering**: Search specific sites like Substack

[Try Exa API](https://dashboard.exa.ai)

<br>

---

Built with ❤️ by [Exa Labs](https://exa.ai)