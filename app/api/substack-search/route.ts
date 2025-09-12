// app/api/substack-search/route.ts - Posts search only
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

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

    console.log(`[Posts Search] Starting search for query: "${query}"`);
    const startTime = Date.now();
    
    const requestBody = {
      query: `Article on topic: ${query}`,
      type: "fast",
      numResults: 10,
      includeDomains: ["substack.com"],
      text: true
    };
    
    console.log(`[Posts Search] Request body:`, JSON.stringify(requestBody, null, 2));
    
    // Use direct curl for maximum performance
    const curlStartTime = Date.now();
    const curlCommand = `curl -s -X POST 'https://api.exa.ai/search' \\
      -H 'x-api-key: ${process.env.EXA_API_KEY}' \\
      -H 'Content-Type: application/json' \\
      -d '${JSON.stringify(requestBody).replace(/'/g, "'\\''")}'`;
    
    const { stdout, stderr } = await execAsync(curlCommand);
    const curlEndTime = Date.now();
    const curlTime = curlEndTime - curlStartTime;
    console.log(`[Posts Search] Curl completed in ${curlTime}ms`);

    if (stderr) {
      throw new Error(`Curl error: ${stderr}`);
    }

    const parseStartTime = Date.now();
    const result = JSON.parse(stdout);
    const parseEndTime = Date.now();
    const jsonParseTime = parseEndTime - parseStartTime;
    
    const endTime = Date.now();
    const totalResponseTime = endTime - startTime;
    console.log(`[Posts Search] JSON parsing took ${jsonParseTime}ms`);
    console.log(`[Posts Search] Total API call completed in ${totalResponseTime}ms, returned ${result.results.length} results`);

    return NextResponse.json({ results: result.results });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: `Failed to perform posts search | ${error}` }, { status: 500 });
  }
}
