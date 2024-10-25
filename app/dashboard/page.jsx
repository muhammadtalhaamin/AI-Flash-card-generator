'use client';
import React, { useState } from 'react';
import { Upload, FileText, Loader } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FlashCard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="relative h-48 w-full perspective-1000"
      onClick={handleClick}
    >
      <div className={`relative w-full h-full duration-500 preserve-3d cursor-pointer ${
        isFlipped ? 'rotate-y-180' : ''
      }`}>
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="p-6 rounded-lg border bg-card h-full flex flex-col justify-between">
            <div className="overflow-auto">
              <h3 className="font-semibold text-lg mb-2">Question</h3>
              <p className="text-gray-600">{question}</p>
            </div>
            <p className="text-sm text-gray-400 text-center">Click to reveal answer</p>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="p-6 rounded-lg border bg-card h-full flex flex-col justify-between">
            <div className="overflow-auto">
              <h3 className="font-semibold text-lg mb-2">Answer</h3>
              <p className="text-gray-600">{answer}</p>
            </div>
            <p className="text-sm text-gray-400 text-center">Click to see question</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const validFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (selectedFile && validFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please upload a Text document');
      setFile(null);
    }
  };

  const generateFlashcards = async () => {
    if (!file) {
      setError('Please upload a file first');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/generate-flashcards', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate flashcards');
      }

      setFlashcards(data.flashcards);
      
      if (data.totalChunks > data.processedChunks) {
        setError(`Note: Only processed ${data.processedChunks} of ${data.totalChunks} sections due to size limitations. Consider uploading a smaller document for better results.`);
      }
    } catch (err) {
      if (err.message.includes('Rate limit exceeded')) {
        setError('Please wait a few minutes before trying again, or try with a smaller document.');
      } else if (err.message.includes('too large')) {
        setError('Document is too large. Please try with a smaller document (less than 10 pages recommended).');
      } else {
        setError('Failed to generate flashcards. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setFlashcards([]);
    setError('');
  };

  return (
    
    <div className="flex flex-col min-h-[calc(100vh-165px)]">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-2">Study Dashboard</h1>
        <h2 className="text-gray-500 mb-6">Generate flashcards from your documents</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
              <CardDescription>Upload a Text document(.txt) to generate flashcards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="w-full">
                  <label 
                    htmlFor="file-upload" 
                    className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-4 pb-4">
                      <Upload className="h-8 w-8 mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        {file ? file.name : 'Click to upload or drag and drop'}
                      </p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                
                <Button 
                  onClick={generateFlashcards}
                  disabled={!file || loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Generating Flashcards...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Flashcards
                    </>
                  )}
                </Button>

                <Button 
                  onClick={resetAll}
                  className="w-full"
                  variant="secondary"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Flashcards Display Section */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Generated Flashcards</CardTitle>
                <CardDescription>Click on a card to reveal its answer</CardDescription>
              </CardHeader>
            </Card>
            
            {flashcards.length > 0 ? (
              <div className="grid gap-4">
                {flashcards.map((card, index) => (
                  <FlashCard
                    key={index}
                    question={card.question}
                    answer={card.answer}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-4">
                  <div className="text-center text-gray-500">
                    No flashcards generated yet
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
    
  );
}