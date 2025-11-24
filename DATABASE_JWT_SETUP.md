# 🚀 Complete Database & JWT Setup Guide for BuddyScript

## 📋 Quick Setup Checklist

- [ ] Choose and setup database
- [ ] Configure environment variables in Vercel
- [ ] Setup Pusher for real-time features
- [ ] Test deployment

---

## 🗄️ Database Setup (Choose One)

### Option 1: Vercel Postgres ⭐ (Recommended)

**Steps:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Storage" tab → "Create Database"
3. Select "Postgres" → Create
4. Copy the `DATABASE_URL` from the dashboard
5. Add to Vercel environment variables

**Pros:** 
- Seamless integration with Vercel
- Automatic connection pooling
- Built-in backups

### Option 2: PlanetScale MySQL (Free Tier)

**Steps:**
1. Sign up at [planetscale.com](https://planetscale.com)
2. Create new database
3. Go to "Connect" → Copy connection string
4. Format: `mysql://username:password@host/database?sslaccept=strict`

**Pros:**
- Generous free tier
- Branching for database schema changes
- Automatic scaling

### Option 3: Railway PostgreSQL

**Steps:**
1. Sign up at [railway.app](https://railway.app)
2. Create new project → Add PostgreSQL
3. Go to Variables tab → Copy `DATABASE_URL`

**Pros:**
- Simple setup
- Good free tier
- PostgreSQL compatible

---

## 🔐 JWT Secret Setup

**Your Generated Secret:** 
```
Qxn6/bwicxrCgyLbCUqfl5sNuQeuljHRW1c+9lCOC6U=
```

**Security Notes:**
- ✅ 32+ characters (cryptographically secure)
- ✅ Base64 encoded
- ✅ Generated with OpenSSL

---

## 📡 Pusher Setup (Real-time Features)

**Steps:**
1. Sign up at [pusher.com](https://pusher.com)
2. Create new app:
   - **Name:** BuddyScript
   - **Cluster:** Choose closest to your users (us2, eu, ap3, etc.)
   - **Frontend:** React
   - **Backend:** Node.js
3. Copy credentials from "App Keys" tab

**Free Tier Includes:**
- 200,000 messages/day
- 100 concurrent connections
- Unlimited channels

---

## ⚙️ Vercel Environment Variables

Add these in **Vercel Dashboard → Settings → Environment Variables:**

```bash
# Database (Choose your option from above)
DATABASE_URL=your-database-connection-string

# Authentication
JWT_SECRET=Qxn6/bwicxrCgyLbCUqfl5sNuQeuljHRW1c+9lCOC6U=

# Pusher (Get from pusher.com dashboard)
PUSHER_APP_ID=your-app-id
PUSHER_KEY=your-key
PUSHER_SECRET=your-secret
PUSHER_CLUSTER=us2
NEXT_PUBLIC_PUSHER_KEY=your-key
NEXT_PUBLIC_PUSHER_CLUSTER=us2
```

---

## 🔄 Database Migration for Production

When using PostgreSQL in production, you'll need to run this command once:

```bash
# This runs automatically in Vercel build process
npx prisma migrate deploy
```

---

## 🧪 Testing Your Setup

### Local Testing with Production Database:
```bash
# Create .env.local with production variables
cp .env.production .env.local

# Update DATABASE_URL with your production database
# Run migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### Production Testing:
1. Deploy to Vercel
2. Check build logs for any errors
3. Visit your deployed URL
4. Test registration and login
5. Create a post to test real-time features

---

## 🚨 Troubleshooting

### Database Connection Issues:
- ✅ Check DATABASE_URL format
- ✅ Ensure database allows external connections
- ✅ Verify SSL settings if required

### JWT Issues:
- ✅ JWT_SECRET must be same across all environments
- ✅ Minimum 32 characters required
- ✅ No spaces or special characters in secret

### Pusher Issues:
- ✅ Check NEXT_PUBLIC_* variables are set
- ✅ Verify cluster matches your Pusher app
- ✅ Ensure app is not paused in Pusher dashboard

---

## ✅ Deployment Checklist

Before deploying:
- [ ] Database created and accessible
- [ ] All environment variables added to Vercel
- [ ] Pusher app configured
- [ ] Latest code pushed to GitHub
- [ ] Ready to deploy!

**Your BuddyScript app is ready for production! 🎉**