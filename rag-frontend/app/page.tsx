'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import QueryInput from '../components/QueryInput';

export default function Home() {
  const [response, setResponse] = useState('');
  const [activeDocument, setActiveDocument] = useState<string | null>(null);

  const handleFileUploaded = (fileName: string) => {
    setActiveDocument(fileName);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {!activeDocument ? (
          <>
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-3 tracking-tight">
                Document AI Assistant
              </h1>
              <p className="text-gray-500 text-lg">Upload a document and ask data-driven questions</p>
            </div>
            <FileUpload onFileUploaded={handleFileUploaded} />
          </>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Chatting with: <span className="text-blue-600">{activeDocument}</span>
              </h1>
              <p className="text-gray-500">Ask questions about your uploaded data</p>
            </div>

            <div className="space-y-6">
              <QueryInput onResponse={setResponse} />

              {response && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 transition-all duration-200 ease-in-out">
                  <div className="flex items-start space-x-3 mb-4">
                    <FileText className="text-blue-500 mt-1 w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-700">Response</h2>
                  </div>
                  <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{response}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}