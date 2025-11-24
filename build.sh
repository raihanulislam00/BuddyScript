#!/usr/bin/env bash
# This script runs during Vercel build process

echo "🚀 Starting Vercel build process..."

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations (for production database)
if [ "$VERCEL_ENV" = "production" ]; then
  echo "📊 Running production database migrations..."
  npx prisma migrate deploy
else
  echo "🔧 Running development database setup..."
  npx prisma db push
fi

# Build the Next.js application
npm run build

echo "✅ Build process completed!"