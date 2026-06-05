# Next-Gen Learning Dashboard

## Overview

A futuristic student dashboard built with:

- Next.js 15
- TypeScript
- Supabase
- Tailwind CSS
- Framer Motion

The dashboard fetches live learning data from Supabase and displays it using animated Bento-style cards.

## Features

- Server-side data fetching
- Animated course cards
- Bento dashboard layout
- Learning activity visualization
- Error handling
- Loading states
- Responsive design
- Supabase integration

## Architecture

The application uses Next.js Server Components for secure data fetching.

Supabase communication occurs on the server through `@supabase/ssr`.

Client components are used only where animation and interactivity are required.

## Setup

```bash
npm install
npm run dev
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Deployment

Vercel URL:
https://next-gen-learning-dashboard-vivek2811.vercel.app
