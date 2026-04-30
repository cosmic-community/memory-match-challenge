# Memory Match Challenge

A fun memory card matching game built with Next.js and powered by [Cosmic](https://www.cosmicjs.com).

## Features

- 🎚️ Three difficulty levels (Easy 4x4, Medium 6x6, Hard 8x8)
- ⏱️ Real-time game timer
- 🎯 Move counter and scoring system
- 🏆 Leaderboard with top scores
- 🎴 Smooth card flip animations
- 📱 Fully responsive design

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6995a33bfc83ec3ef0716f56&clone_repository=69f38040d696f0214a977eca)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a company website with services, team members, testimonials, and case studies"

### Code Generation Prompt

> Create a memory card matching game with different difficulty levels and score tracking

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Cosmic CMS

## Getting Started

### Prerequisites

- Bun installed
- A Cosmic account and bucket

### Installation

```bash
bun install
bun run dev
```

## Cosmic SDK Examples

```typescript
// Save a score
await cosmic.objects.insertOne({
  type: 'scores',
  title: playerName,
  metadata: { score, moves, time, difficulty }
})

// Get top scores
const { objects } = await cosmic.objects.find({ type: 'scores' })
```

## Cosmic CMS Integration

Scores are saved to a `scores` content type in your Cosmic bucket.

## Deployment Options

- Deploy to Vercel
- Deploy to Netlify
<!-- README_END -->