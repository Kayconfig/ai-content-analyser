# AI-Powered Content Analyzer API

## Overview

The AI-Powered Content Analyzer API is a NestJS-based application that allows users to submit text content for analysis using a Large Language Model (LLM). The API provides features like text summarization, sentiment analysis, and theme extraction, powered by Large language model like Ollama, OpenAi GPT. It demonstrates modular NestJS architecture, input validation, error handling, and optional persistence with SQLite or in-memory storage. This project is designed as a take-home assignment to showcase proficiency in NestJS, TypeScript, and LLM integration.

## Features

- **POST /analyze**: Submit text content for AI-driven analysis (summary, sentiment, or themes).
- **GET /analyses/:id**: Retrieve a previously analyzed result by ID.
- **Input Validation**: Ensures valid input using DTOs and NestJS ValidationPipe.
- **Error Handling**: Gracefully handles LLM API errors and rate limits.
- **Optional Persistence**: Stores analysis results in SQLite (via TypeORM) or in-memory storage.
- **Extensibility**: Supports adding authentication or rate limiting for production use.

## Tech Stack

- **Framework**: NestJS (v10.x)
- **LLM Provider**: OpenAI GPT (v4.x SDK)
- **Database**: SQLite (via TypeORM, optional) or in-memory storage
- **Dependencies**: `@nestjs/common`, `@nestjs/core`, `openai`, `class-validator`, `class-transformer`, `@nestjs/typeorm` (optional)
- **Testing**: Jest for unit tests

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- OpenAI API key (set up a free-tier account at https://platform.openai.com/)
- SQLite (optional, for persistence)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-analyzer-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   DATABASE_URL=sqlite://./database.sqlite # Optional, for SQLite
   ```
4. Run the application:
   ```bash
   npm run start:dev
   ```

## Usage

- **Base URL**: `http://localhost:3000`
- **Endpoints**:
  - `POST /analyze`
    - Body: `{ "content": "Your text here", "analysisType": "< summary | sentiment | themeExtraction >" }`
    - Response: `{ "id": "uuid", "result": "Summary text", "confidence": 0.95 }`
  - `GET /analyses/:id`
    - Response: Returns stored analysis or 404 if not found
- Test with tools like Postman or curl:
  ```bash
  curl -X POST http://localhost:3000/analyze -H "Content-Type: application/json" -d '{"content":"This is a sample text.","analysisType":"summary"}'
  ```

## Project Structure

```
src/
├── analysis/
│   ├── analysis.controller.ts
│   ├── analysis.service.ts
│   ├── analysis.module.ts
│   ├── dto/
│   │   └── analyze-content.dto.ts
├── app.module.ts
├── main.ts
tests/
├── analysis/
│   └── analysis.service.spec.ts
```

## Testing

Run unit tests with:

```bash
npm run test
```

The project includes Jest tests for the `AnalysisService`, covering LLM integration and input validation.

## Potential Improvements

- Add JWT authentication using `@nestjs/passport`.
- Implement rate limiting with `@nestjs/throttler`.
- Support multimodal LLMs for image or mixed content analysis.
- Add caching for LLM responses to optimize performance.

## Notes

- Ensure your OpenAI API key is kept secure and not committed to version control.
- For demo purposes, mock LLM responses can be used if API access is limited.
- The project is designed to be lightweight yet extensible, suitable for a 4-8 hour take-home assignment.

## License

MIT License
