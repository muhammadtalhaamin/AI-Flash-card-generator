import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to split text into chunks
function splitIntoChunks(text, maxLength = 50000) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const chunks = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length <= maxLength) {
      currentChunk += sentence;
    } else {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    }
  }
  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
}

// Function to generate flashcards for a chunk of text
async function generateFlashcardsForChunk(chunk, numCards = 2) {
  try {
    const completion = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates educational flashcards based on the provided text. Generate flashcards in JSON format with 'question' and 'answer' fields."
        },
        {
          role: "user",
          content: `Please create ${numCards} flashcards from this Content using the topics discussed in it and return them in JSON format. Each flashcard should have a 'question' and a detailed 'answer' field. Make the flashcards concise and focused on key concepts. Content: ${chunk}`
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = JSON.parse(completion.choices[0].message.content);
    return response.flashcards || [];
  } catch (error) {
    console.error('Error generating flashcards for chunk:', error);
    return [];
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Read the file content
    const fileContent = await file.text();
    
    // Split content into manageable chunks
    const chunks = splitIntoChunks(fileContent);
    
    // Limit the number of chunks to process (to avoid rate limits)
    const chunksToProcess = chunks.slice(0, 5); // Process max 5 chunks
    
    // Generate flashcards for each chunk
    const allFlashcards = [];
    
    // Process chunks sequentially to avoid rate limits
    for (const chunk of chunksToProcess) {
      const flashcardsForChunk = await generateFlashcardsForChunk(chunk);
      allFlashcards.push(...flashcardsForChunk);
    }

    // Limit total number of flashcards
    const limitedFlashcards = allFlashcards.slice(0, 10); // Return max 10 flashcards

    return NextResponse.json({ 
      flashcards: limitedFlashcards,
      totalChunks: chunks.length,
      processedChunks: chunksToProcess.length
    });

  } catch (error) {
    console.error('Error in generate-flashcards:', error);
    
    // Handle specific error types
    if (error.code === 'rate_limit_exceeded') {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again with a smaller document or wait a few minutes.' },
        { status: 429 }
      );
    }

    if (error.code === 'context_length_exceeded') {
      return NextResponse.json(
        { error: 'Document is too large. Please try with a smaller document.' },
        { status: 413 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate flashcards. Please try again.' },
      { status: 500 }
    );
  }
}