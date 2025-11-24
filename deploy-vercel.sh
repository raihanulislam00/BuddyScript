#!/bin/bash
# Vercel deployment script

echo "🚀 Starting Vercel deployment..."

# Login to Vercel (opens browser)
echo "Please login to Vercel in the browser that opens..."
vercel login

# Deploy the project
echo "📦 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "Your app should be available at the URL shown above."