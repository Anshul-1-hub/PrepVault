# PrepVault
PrepVault is a placement portal for a college to manage students and update them with their ongoing internship/placement drives. Seniors can interact with their juniors to guide them by sharing their own interview experiences as well as suggest them resources which could help them.

## What it does

- **Interview Experiences** — Seniors post their interview experiences, students can read, comment, and upvote. No more hunting through WhatsApp forwards.
- **Question Bank** — Company-wise DSA and HR questions with difficulty tags, rounds, and upvotes. Filtered by company, topic, or difficulty.
- **Resource Hub** — Curated links for each domain (SDE, Data Science, PM, etc.) submitted by seniors and admins. Redis-cached for fast loads.
- **Placement Drive Tracker** — Admins post upcoming drives with eligibility, package, and dates. Students apply and track their status (Applied → Shortlisted → Accepted/Rejected).

## Roles

| Role | What they can do |
|------|-----------------|
| Student | Read everything, comment, upvote, apply to drives |
| Senior | Everything a student can + post experiences, add questions and resources |
| Admin | Everything + manage drives, update application statuses, moderate content |

## Tech Stack

**Frontend** — React, TypeScript, Tailwind CSS, React Query, React Router

**Backend** — Node.js, Express v5, PostgreSQL, Prisma ORM, BetterAuth

**Infrastructure** — Redis (Upstash) for caching and rate limiting, Zod for validation

## Running locally

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Upstash Redis account (free tier works)

### Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/prepvault.git
cd prepvault
```

**Backend**
```bash
cd server
npm install

# Set up your .env
cp .env.example .env
# Fill in DATABASE_URL, SHADOW_DATABASE_URL, BETTER_AUTH_SECRET, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN

npx prisma migrate dev
npm run dev
```

**Frontend**
```bash
cd client
npm install
npm run dev
```

Server runs on `http://localhost:5000`, client on `http://localhost:5173`.

## Project structure

```
prepvault/
├── client/          # React frontend
└── server/
    ├── src/
    │   ├── controllers/
    │   ├── middleware/   # auth, role check, rate limiter
    │   ├── routes/
    │   ├── validators/   # Zod schemas
    │   └── lib/          # prisma, redis, auth clients
    └── prisma/
        └── schema.prisma
```

## Notes

- Rate limiting is applied on all POST routes (5 requests/minute per user)
- Resources are cached in Redis with a 1-hour TTL, invalidated on delete
- BetterAuth handles sessions — add `Origin: http://localhost:5173` header when testing with Postman
