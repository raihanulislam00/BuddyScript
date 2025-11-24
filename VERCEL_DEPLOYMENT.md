# Vercel Deployment Environment Variables

## Required Environment Variables for Vercel

When deploying to Vercel, you'll need to set these environment variables in your Vercel dashboard:

### Database
```
DATABASE_URL="your-production-database-url"
```
**Note**: For production, consider using:
- **Vercel Postgres**: Built-in PostgreSQL database
- **PlanetScale**: MySQL-compatible serverless database  
- **Railway**: PostgreSQL with generous free tier
- **Supabase**: PostgreSQL with additional features

### Authentication
```
JWT_SECRET="your-super-secure-jwt-secret-at-least-32-characters"
```

### Pusher (Real-time Features)
```
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_KEY="your-pusher-key"
PUSHER_SECRET="your-pusher-secret"
PUSHER_CLUSTER="your-pusher-cluster"
NEXT_PUBLIC_PUSHER_KEY="your-pusher-key"
NEXT_PUBLIC_PUSHER_CLUSTER="your-pusher-cluster"
```

## Quick Setup Guide

1. **Create Vercel Account**: Go to https://vercel.com
2. **Connect GitHub**: Link your GitHub repository
3. **Import Project**: Select the BuddyScript repository
4. **Set Environment Variables**: Add all variables above in Vercel dashboard
5. **Deploy**: Vercel will automatically deploy your app

## Database Setup Options

### Option 1: Vercel Postgres (Recommended)
```bash
# In Vercel dashboard, go to Storage > Create Database > Postgres
# Copy the DATABASE_URL from the dashboard
```

### Option 2: PlanetScale (Free Tier Available)
```bash
# Sign up at planetscale.com
# Create database and get connection string
# Update DATABASE_URL with the connection string
```

### Option 3: Railway (PostgreSQL)
```bash
# Sign up at railway.app  
# Create PostgreSQL database
# Copy the DATABASE_URL from Railway dashboard
```

## Deployment Steps

1. **Push to GitHub** (Already done ✅)
2. **Sign in to Vercel** with GitHub account
3. **Import Repository**: https://github.com/raihanulislam00/BuddyScript
4. **Configure Environment Variables** in Vercel dashboard
5. **Deploy**: Click "Deploy" button

## Post-Deployment

- Your app will be available at: `https://your-app-name.vercel.app`
- Backend APIs will work at: `https://your-app-name.vercel.app/api/*`
- Database migrations run automatically on deployment
- Real-time features work with Pusher configuration

## Troubleshooting

- **Database Issues**: Ensure DATABASE_URL is correct and accessible
- **Environment Variables**: Double-check all env vars are set in Vercel dashboard
- **Build Errors**: Check Vercel build logs for specific error messages
- **API Routes**: All `/api/*` routes become serverless functions automatically