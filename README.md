# Spreadsheet RAG

> Note: This project was completed as an assignment from Clienter AI.

A Retrieval-Augmented Generation (RAG) system for querying spreadsheet data using natural language, built with Next.js and FastAPI.

## Live Demo
- Frontend: [spreadsheet-rag.vercel.app]
- Backend: [spreadsheet-rag-production.up.railway.app](https://spreadsheet-rag-production.up.railway.app)

## Features
- 📊 Upload and analyze spreadsheet data
- 💬 Natural language querying of spreadsheet content
- 🤖 Powered by Google Gemini API
- 🚀 Real-time responses using RAG architecture
- ⚠️ Note: Sometimes data might not produce proper answers due to AI agents handling the interpretation

## Tech Stack

### Backend
- FastAPI
- Google Gemini API
- Python RAG implementation
- Railway for deployment

### Frontend
> Note: I'm new to frontend development, so the implementation might not follow traditional best practices.

- Next.js 13+
- TailwindCSS
- TypeScript
- Vercel for deployment

## Local Development

### Prerequisites
- Node.js 16+ (Note: Some Next.js features might require newer versions)
- Python 3.9+ (Required for Google Gemini API compatibility)
- Google Gemini API key

### Backend Setup
1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd rag-backend
   ```
3. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Create a `.env` file and add your Google Gemini API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```
6. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be available at `http://localhost:8000`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd rag-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the backend URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.