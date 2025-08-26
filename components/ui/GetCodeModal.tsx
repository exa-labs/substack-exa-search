"use client";

import { useState } from "react";
import { X, Copy, Check } from "lucide-react";

interface GetCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GetCodeModal({ isOpen, onClose }: GetCodeModalProps) {
  const [activeTab, setActiveTab] = useState<'curl' | 'python' | 'javascript'>('curl');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const curlCode = `curl -X POST https://api.exa.ai/search \\
  --header "content-type: application/json" \\
  --header "x-api-key: EXA_API_KEY" \\
  --data '
{
    "query": "article about AI",
    "type": "auto",
    "includeDomains": ["*.substack.com"],
    "numResults": 20,
    "contents": {
      "summary": true
    }
  }'`;

  const pythonCode = `from exa_py import Exa

exa = Exa(api_key = "EXA_API_KEY")

result = exa.search_and_contents(
  "article about AI",
  type = "auto",
  include_domains = ["*.substack.com"],
  summary = True,
  num_results = 20
)`;

  const javascriptCode = `import Exa from "exa-js";

const exa = new Exa("EXA_API_KEY");

const result = await exa.searchAndContents(
  "article about AI",
  {
    type: "auto",
    includeDomains: ["*.substack.com"],
    summary: true,
    numResults: 20
  }
);`;

  const getCodeForTab = () => {
    switch (activeTab) {
      case 'curl':
        return curlCode;
      case 'python':
        return pythonCode;
      case 'javascript':
        return javascriptCode;
      default:
        return '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-50 bg-opacity-5 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Get Code</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            This project was built with the{" "}
            <a
              href="https://docs.exa.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Exa API
            </a>
            . You can use the following code to recreate this search yourself:
          </p>

          {/* Tabs */}
          <div className="flex border-b mb-4">
            <button
              onClick={() => setActiveTab('curl')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'curl'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Curl
            </button>
            <button
              onClick={() => setActiveTab('python')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'python'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setActiveTab('javascript')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'javascript'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              JavaScript
            </button>
          </div>

          {/* Code Block */}
          <div className="relative">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
              <button
                onClick={() => copyToClipboard(getCodeForTab(), activeTab)}
                className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-colors bg-gray-800 rounded"
                title="Copy to clipboard"
              >
                {copiedStates[activeTab] ? <Check size={16} /> : <Copy size={16} />}
              </button>
              <pre className="whitespace-pre-wrap pr-12">{getCodeForTab()}</pre>
            </div>
          </div>

          {/* API Key Note */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> You can find your API key at{" "}
              <a
                href="https://dashboard.exa.ai/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-900"
              >
                dashboard.exa.ai/api-keys
              </a>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              You can also view this project's source code on{" "}
              <a
                href="https://github.com/exa-labs/substack-exa-search"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
