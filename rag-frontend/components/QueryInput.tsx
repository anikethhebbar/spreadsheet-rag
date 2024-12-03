'use client';

import { useState, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface QueryInputProps {
  onResponse: (response: string) => void;
}

export default function QueryInput({ onResponse }: QueryInputProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const processingMessages = [
    "Analyzing your question...",
    "Searching through the document...",
    "Generating response...",
    "Almost there..."
  ];

  useEffect(() => {
    let messageInterval: NodeJS.Timeout;
    let messageIndex = 0;

    if (loading) {
      setProcessingMessage(processingMessages[0]);
      messageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % processingMessages.length;
        setProcessingMessage(processingMessages[messageIndex]);
      }, 2000);
    }

    return () => {
      if (messageInterval) clearInterval(messageInterval);
      setProcessingMessage('');
    };
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error('Query failed');

      const data = await response.json();
      onResponse(data.answer);
      setQuery(''); // Clear input after successful query
    } catch (error) {
      console.error(error);
      onResponse('Error processing query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center space-x-2 bg-white rounded-xl shadow-lg border border-gray-200">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about your document..."
            className="flex-1 p-4 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="p-4 bg-blue-500 text-white rounded-r-xl hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </form>
      {loading && processingMessage && (
        <div className="flex items-center justify-center text-sm text-blue-500">
          <Loader2 className="animate-spin w-4 h-4 mr-2" />
          <span>{processingMessage}</span>
        </div>
      )}
    </div>
  );
}