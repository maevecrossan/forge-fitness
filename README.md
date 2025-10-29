# Forge Fitness

## Tech Stack
### Core Stack 

| Layer | Tech / Service | Purpose | Why It’s a Good Fit |
|-------|----------------|----------|--------------------|
| **Frontend / Full-Stack Framework** | **Next.js 15 (App Router)** | Hybrid frontend + backend framework | Provides React 19, API Routes, Server Actions, and edge deployment - ideal for CRUD and auth. |
| **Language / Typing** | **TypeScript (strict mode)** | Type-safe JavaScript | Improves reliability and developer experience. |
| **UI & Styling** | **Tailwind CSS 4**, **shadcn/ui**, **Lucide React** icons | Fast, accessible, modern UI | You already use Tailwind; shadcn/ui adds a consistent component system. |
| **Forms / Validation** | **Zod** | Schema validation | Ensures safe and validated client/server data. |
| **State & Data Fetching** | **React Query (TanStack Query)** or **Server Actions** | Async fetching and caching | Plays nicely with Next.js 15; simplifies data synchronization. |
| **Database** | **PostgreSQL** (Neon) | Primary relational DB | Reliable, free, and easy to integrate with Prisma. |
| **ORM** | **Prisma** | Database modelling + queries + migrations | Great developer experience and strong TypeScript support. |
| **Authentication** | **Auth.js (NextAuth)** + Email + Google OAuth | Secure user sessions | Simple, serverless-friendly, and customizable. |
| **File Storage (Local)** | **UploadThing** (Phase 1) | Simple uploads | Free tier, no infra setup. |
| **Cloud Storage (AWS)** | **AWS S3 + CloudFront** (Phase 3.5) | Durable media storage + CDN | Adds AWS experience and scales for larger media. |
| **Serverless Jobs** | **AWS Lambda + EventBridge Scheduler** | Automated daily jobs | Perfect for streaks and analytics, builds real AWS skills. |
| **Email / Notifications** | **Resend** | Transactional email (auth, reminders) | Free tier, simple API, and modern DX. |
| **Analytics** | **PostHog** | Product analytics | Privacy-friendly, good free tier. |
| **Error Monitoring** | **Sentry** | Runtime and build error tracking | Improves reliability and debugging. |
| **Hosting / CI/CD** | **Vercel** | Deployment + preview + cron | Optimized for Next.js, includes free CI. |
| **Testing** | **Jest**, **React Testing Library**, **Playwright** | Unit / integration / E2E tests | Full test coverage stack. |
| **Version Control / CI** | **GitHub + GitHub Actions** | Repo + automation | Free CI minutes and easy project tracking. |
