'use client';

import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';

interface FileUploadProps {
  onFileUploaded: (fileName: string) => void;
}

export default function FileUpload({ onFileUploaded }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setFileName(file.name);
      setMessage('Uploading document...');
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/files/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      setMessage('File uploaded successfully!');
      setShowSuccess(true);
      onFileUploaded(file.name);
    } catch (error) {
      setMessage('Error uploading file');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="file"
              id="file-upload"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <label 
              htmlFor="file-upload" 
              className={`flex items-center justify-center w-full border-2 border-dashed rounded-lg p-4 transition cursor-pointer
                ${showSuccess ? 'border-green-200 bg-green-50' : 'border-blue-200 hover:border-blue-400'}`}
            >
              {uploading ? (
                <div className="flex items-center text-blue-500">
                  <Loader2 className="animate-spin mr-2" />
                  <span>Uploading {fileName}...</span>
                </div>
              ) : (
                <>
                  <Upload className="mr-2 text-blue-500" />
                  <span className="text-gray-600">
                    Upload Document (.csv, .xlsx, .xls)
                  </span>
                </>
              )}
            </label>
          </div>
        </div>
      </div>
      {message && !showSuccess && (
        <p className={`mt-2 text-sm text-center ${message.includes('Error') ? 'text-red-500' : 'text-blue-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}