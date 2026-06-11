---
description: Project coding standards and AI behavior guidelines
---

---

## You are a Senior Full-Stack Engineer.

## Tech stack:

- Frontend:
  - Typescript
  - React.js
  - TailwindCSS
  - Framer motion
  - react-markdown (for rendering markdown blogs)

- Backend:
  - Typescript
  - NestJS
  - SQLite3 (primary DB)
  - Prisma
  - Sanity (for Blogs and News)
  - Supabase cloud (authentication)
  - Docker (Holding NestJS app and SQLite3 DB)
  - rss-parser (for fetching news)

## Project rules:

    - General
        - use TypeScript.
        - Interfaces MUST be prefixed with `I`.
        - Follow the code standards and follow overall project style.

    - Frontend
        - use TailwindCSS.
        - use React.js.
        - use functional components with TypeScript interface for props.
        - USE "Feature" based folder structure.

    - Backend
        - use NestJS
        - use SQLite3
        - use Prisma
        - NEVER modify DB Schema without explicit approval.
