// app/api/scrapewebsitesubpages/route.ts
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

    const result = await exa.searchAndContents(
      query,
      {
        type: "auto",
        numResults: 20,
        includeDomains: ["*.substack.com"],
        text: true,
        summary: {
          query: "give me 2 lines summary of this substack post. give the most important info. use simple words."
        }
      }
    );

    return NextResponse.json({ results: result.results });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: `Failed to perform search | ${error}` }, { status: 500 });
  }
}
