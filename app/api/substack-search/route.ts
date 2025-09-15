// app/api/substack-search/route.ts - Posts search only
import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';

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
      contents: {
        text: true
      }
    };
    
    console.log(`[Posts Search] Request body:`, JSON.stringify(requestBody, null, 2));
    
    // Use direct curl spawn (like Python subprocess) for maximum performance
    const curlStartTime = Date.now();
    
    const result = await new Promise<any>((resolve, reject) => {
      // Direct binary execution - no shell, like Python's subprocess.run()
      const curl = spawn('curl', [
        '-s',  // silent
        '-X', 'POST',
        'https://api.exa.ai/search',
        '-H', `x-api-key: ${process.env.EXA_API_KEY}`,
        '-H', 'Content-Type: application/json',
        '-d', JSON.stringify(requestBody)
      ], {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let stdout = '';
      let stderr = '';

      curl.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      curl.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      curl.on('close', (code) => {
        const curlEndTime = Date.now();
        const curlTime = curlEndTime - curlStartTime;
        console.log(`[Posts Search] Curl spawn completed in ${curlTime}ms`);

        if (code !== 0) {
          reject(new Error(`Curl failed with code ${code}: ${stderr}`));
          return;
        }

        if (stderr) {
          reject(new Error(`Curl error: ${stderr}`));
          return;
        }

        try {
          const parseStartTime = Date.now();
          const parsedResult = JSON.parse(stdout);
          const parseEndTime = Date.now();
          const jsonParseTime = parseEndTime - parseStartTime;
          console.log(`[Posts Search] JSON parsing took ${jsonParseTime}ms`);
          resolve(parsedResult);
        } catch (parseError) {
          reject(parseError);
        }
      });

      curl.on('error', (error) => {
        reject(error);
      });

      // Set timeout
      setTimeout(() => {
        curl.kill();
        reject(new Error('Curl timeout'));
      }, 10000);
    });
    
    const endTime = Date.now();
    const totalResponseTime = endTime - startTime;
    console.log(`[Posts Search] Total API call completed in ${totalResponseTime}ms, returned ${result.results.length} results`);

    return NextResponse.json({ results: result.results });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: `Failed to perform posts search | ${error}` }, { status: 500 });
  }
}
