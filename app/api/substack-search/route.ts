import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const EXA_API_KEY = process.env.EXA_API_KEY;
    
    if (!EXA_API_KEY) {
      return NextResponse.json(
        { error: 'EXA_API_KEY environment variable is not configured' },
        { status: 500 }
      );
    }

    // Search specifically on Substack using Exa API
    const exaResponse = await fetch('https://api.exa.ai/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${EXA_API_KEY}`,
      },
      body: JSON.stringify({
        query: query,
        type: 'keyword',
        useAutoprompt: true,
        numResults: 10,
        includeDomains: ['substack.com'],
        includeText: true,
        summary: true,
      }),
    });

    if (!exaResponse.ok) {
      const errorText = await exaResponse.text();
      console.error('Exa API error:', exaResponse.status, errorText);
      return NextResponse.json(
        { error: 'Failed to search Substack posts' },
        { status: exaResponse.status }
      );
    }

    const exaData = await exaResponse.json();
    
    // Transform the results to match our expected format
    const transformedResults = exaData.results?.map((result: any) => ({
      title: result.title || '',
      text: result.text || '',
      summary: result.summary || result.text?.substring(0, 200) + '...' || '',
      url: result.url || '',
      author: result.author || extractAuthorFromUrl(result.url) || '',
      publishedDate: result.publishedDate || new Date().toISOString(),
    })) || [];

    return NextResponse.json({
      results: transformedResults,
      total: exaData.results?.length || 0,
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to extract author from Substack URL
function extractAuthorFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    
    // Extract subdomain from Substack URL (e.g., author.substack.com)
    if (hostname.includes('substack.com')) {
      const parts = hostname.split('.');
      if (parts.length >= 3) {
        return parts[0]; // Return the subdomain (author name)
      }
    }
    
    return '';
  } catch {
    return '';
  }
}
