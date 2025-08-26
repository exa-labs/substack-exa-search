// app/api/substack-writers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Exa from "exa-js";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Check if API key exists
    if (!process.env.EXA_API_KEY) {
      return NextResponse.json({ error: 'EXA_API_KEY environment variable is not set' }, { status: 500 });
    }

    // Initialize Exa client
    const exa = new Exa(process.env.EXA_API_KEY);

    // First, search for writers
    const searchResult = await exa.searchAndContents(
      `Writers who write about: ${query}`,
      {
        type: "auto",
        numResults: 20,
        includeDomains: ["*.substack.com"]
      }
    );

    // Process URLs to remove /p/... paths and get unique writer pages
    const processedUrls = searchResult.results
      .map(item => item.url.includes('/p/') ? item.url.split('/p/')[0] : item.url)
      .filter(url => url.endsWith('.substack.com') || url.includes('.substack.com/'));
    
    const writerUrls = Array.from(new Set(processedUrls)).slice(0, 10); // Limit to 10 writers to avoid too many API calls

    if (writerUrls.length === 0) {
      return NextResponse.json({ results: [] });
    }

    // Now get the actual writer content using getContents
    const writerContents = await exa.getContents(
      writerUrls,
      {
        summary: {
          query: "give me 2 lines summary of this Writer. use simple words."
        }
      }
    );

    return NextResponse.json({ results: writerContents.results });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: `Failed to perform writer search | ${error}` }, { status: 500 });
  }
}
