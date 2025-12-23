# TOEFL Master 2026

An interactive web application for preparing for the new TOEFL iBT format starting January 2026.

## Features

### Speaking Section
- **Listen & Repeat**: Practice repeating sentences exactly as heard (7 sentences per session)
- **Interview**: Answer interview questions with 45-second responses (4 questions per topic)
- Voice recording and playback support via Web Speech API

### Writing Section
- **Build a Sentence**: Reorder scrambled words to form correct sentences
- **Write an Email**: Practice writing formal emails (7 minutes, 80-120 words)
- **Academic Discussion**: Join online class discussions (10 minutes, 100-130 words)

### Vocabulary
- 100+ TOEFL essential words across 6 categories
- Flashcard mode with pronunciation
- Quiz mode with multiple choice questions
- Searchable word list

### Study Notes
- Speaking and writing feedback tracking
- High-score templates for all task types
- TOEFL scoring rubrics explained

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase (optional)
- **Speech**: Web Speech API (TTS & STT)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure Supabase:
   - Copy `.env.example` to `.env.local`
   - Add your Supabase credentials

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## 2026 TOEFL Changes

Starting January 21, 2026, TOEFL iBT will feature:
- Adaptive format with shorter test duration (67-85 minutes)
- New 1-6 band scoring scale aligned with CEFR
- New Speaking tasks: Listen & Repeat, Interview
- New Writing tasks: Build a Sentence, Write an Email, Academic Discussion

## License

MIT
