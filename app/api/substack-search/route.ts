// app/api/scrapewebsitesubpages/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Exa from "exa-js";

export const maxDuration = 60;

const exa = new Exa(process.env.EXA_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const result = await exa.searchAndContents(
      query,
      {
        type: "auto",
        numResults: 20,
        includeDomains: ["*.substack.com"],
        // @ts-ignore
        livecrawl: "preferred",
        summary: {
          query: "give me 2 lines summary of this substack post. give the most important info. use simple words."
        }
      }
    );

    return NextResponse.json({ results: result.results });
  } catch (error) {
    return NextResponse.json({ error: `Failed to perform search | ${error}` }, { status: 500 });
  }
}
