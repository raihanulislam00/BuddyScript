# Buddy Script (Appifylab Assessment)

A full-stack Next.js application that recreates the provided Buddy Script login, registration, and feed screens with working authentication, authorization, and social-feed functionality.

## Tech Stack

- **Frontend**: Next.js App Router, React Server/Client Components, Bootstrap-based static assets from the provided design
- **Backend**: Next.js Route Handlers
- **Auth**: Cookie-based JWT sessions
- **Database**: Prisma ORM with SQLite (easily swappable for Postgres/MySQL/etc.)

## Features

### Authentication
- Registration collects first name, last name, email, and password
- Secure password hashing with bcrypt
- Session cookies issued via signed JWTs
- Middleware protects `/feed`, while `/login` and `/register` redirect authenticated users away

### Feed
- Protected feed displaying public posts from everyone plus the user’s private posts
- Create posts with text + optional image upload (base64 storage for demo purposes)
- Toggle public/private visibility per post
- Like/unlike posts and comments, with visible like summaries
- Threaded comments with one level of replies, each with their own like toggles
- Shows who liked posts/comments/replies
- Live notifications powered by Pusher, plus a quick broadcast form for testing

## Getting Started

1. **Install dependencies**
	```bash
	npm install
	```

2. **Configure environment**
	Ensure `.env` contains:
	```env
	DATABASE_URL="file:./prisma/dev.db"
	JWT_SECRET="replace-with-strong-secret"
	PUSHER_APP_ID="your-app-id"
	PUSHER_KEY="your-key"
	PUSHER_SECRET="your-secret"
	PUSHER_CLUSTER="your-cluster"
	NEXT_PUBLIC_PUSHER_KEY="your-key"
	NEXT_PUBLIC_PUSHER_CLUSTER="your-cluster"
	```

3. **Apply Prisma migrations**
	```bash
	npx prisma migrate dev
	```

4. **Run the dev server**
	```bash
	npm run dev
	```
	Visit [http://localhost:3000](http://localhost:3000). You will be redirected to `/login` if not authenticated.

5. **Lint (optional)**
	```bash
	npm run lint
	```

## Project Structure Highlights

- `app/(auth)/login`, `app/(auth)/register`: Auth screens using the provided markup
- `app/feed`: Protected feed route rendering the interactive feed
- `app/api/*`: REST-style endpoints for auth, posts, comments, and likes
- `lib/`: Prisma client, JWT helpers, validation schemas, and session utilities
- `components/auth`: Client-side login & registration forms
- `components/feed`: Feed shell, composer, post card, and comment thread components
- `public/assets`: Original CSS, JS, fonts, and images supplied with the task

## Notes & Future Improvements

- Images are stored as base64 strings; use object storage (S3, Cloudinary, etc.) for production.
- Prisma models are indexed for scaling, and switching to another database only requires updating `DATABASE_URL` and re-running migrations.
- Rate limiting, content moderation, and notifications can be layered on top of the existing API structure.

Enjoy building on top of Buddy Script! If you need clarifications or enhancements, feel free to ask.
