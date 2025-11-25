# BuddyScript - Social Media Platform

A modern full-stack social media application built with Next.js, featuring authentication, real-time feed, explore sections, and interactive social features.

## 🌟 Features

### 🔐 Authentication System
- **User Registration**: Secure account creation with validation
- **JWT-based Login**: Token-based authentication with bcrypt password hashing
- **Session Management**: Protected routes with middleware
- **Auto-redirect**: Authenticated users redirected from auth pages

### 📱 Social Feed
- **Interactive Posts**: Create, like, and comment on posts
- **Real-time Updates**: Live notifications powered by Pusher
- **Privacy Controls**: Public/private post visibility toggle
- **Threaded Comments**: Multi-level comment system with likes
- **User Interactions**: View who liked posts and comments

### 🌍 Explore Features
- **Learning Hub**: Interactive courses, live sessions, and progress tracking
- **Insights Dashboard**: Real-time analytics and AI-powered insights
- **Find Friends**: Friend discovery and connection management
- **Notifications**: Real-time notification system
- **Messaging**: Direct messaging capabilities

## 🚀 Live Deployment

**Production URL**: [https://buddy-script1.vercel.app](https://buddy-script1-d7cjejbd5-raihanulislam12s-projects.vercel.app)

- ✅ **Frontend & Backend**: Deployed on Vercel
- ✅ **Database**: PostgreSQL (Neon free tier)
- ✅ **Authentication**: Fully working JWT system
- ✅ **Real-time**: Pusher integration ready

## 🛠 Tech Stack

### Frontend
- **Next.js 16.0.3**: App Router with Turbopack
- **React 19**: Server and Client Components
- **TailwindCSS**: Modern styling framework
- **TypeScript**: Type-safe development

### Backend
- **Next.js API Routes**: Serverless backend functions
- **Prisma ORM**: Database management and migrations
- **PostgreSQL**: Production database (Neon)
- **JWT Authentication**: Secure token-based auth

### Real-time & Services
- **Pusher**: Real-time notifications and updates
- **Vercel**: Hosting and deployment platform
- **bcryptjs**: Password hashing and security

## 🏗 Project Structure

```
BuddyScript/
├── app/
│   ├── (auth)/                 # Authentication routes
│   │   ├── login/page.tsx      # Login page
│   │   └── register/page.tsx   # Registration page
│   ├── api/                    # Backend API routes
│   │   ├── auth/               # Authentication endpoints
│   │   ├── posts/              # Post management
│   │   ├── comments/           # Comment system
│   │   └── notifications/      # Real-time notifications
│   ├── explore/                # Feature exploration pages
│   │   ├── learning/           # Learning platform
│   │   ├── insights/           # Analytics dashboard
│   │   └── find-friends/       # Social connections
│   ├── feed/page.tsx           # Main social feed
│   └── layout.tsx              # App layout
├── components/
│   ├── auth/                   # Authentication components
│   ├── feed/                   # Feed-related components
│   └── notifications/          # Notification components
├── lib/                        # Utility libraries
│   ├── auth.ts                 # Authentication helpers
│   ├── prisma.ts               # Database client
│   └── validation.ts           # Input validation
├── prisma/
│   └── schema.prisma           # Database schema
└── public/assets/              # Static assets
```

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/raihanulislam00/BuddyScript.git
cd BuddyScript
npm install
```

### 2. Environment Setup
Create `.env.local`:
```env
# Database (PostgreSQL)
DATABASE_URL="your-postgresql-connection-string"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"

# Pusher (Real-time features)
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_KEY="your-pusher-key"
PUSHER_SECRET="your-pusher-secret"
PUSHER_CLUSTER="us2"
NEXT_PUBLIC_PUSHER_KEY="your-pusher-key"
NEXT_PUBLIC_PUSHER_CLUSTER="us2"
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) View database
npx prisma studio
```

### 4. Development
```bash
# Start development server
npm run dev

# Open http://localhost:3000
# You'll be redirected to /login if not authenticated
```

### 5. Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📊 Database Schema

### User Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  firstName String
  lastName  String
  password  String
  createdAt DateTime @default(now())
  posts     Post[]
  comments  Comment[]
  likes     Like[]
}
```

### Post Model
```prisma
model Post {
  id        Int       @id @default(autoincrement())
  content   String
  image     String?
  isPublic  Boolean   @default(true)
  userId    Int
  user      User      @relation(fields: [userId], references: [id])
  comments  Comment[]
  likes     Like[]
  createdAt DateTime  @default(now())
}
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session` - Get current session

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `POST /api/posts/[id]/like` - Toggle post like

### Comments
- `GET /api/posts/[id]/comments` - Get post comments
- `POST /api/posts/[id]/comments` - Create comment
- `POST /api/comments/[id]/like` - Toggle comment like

### Notifications
- `GET /api/notifications` - Get user notifications

## 🌟 Key Features Implemented

### ✅ Completed
- **Full Authentication System**: Registration, login, logout, session management
- **Social Feed**: Create posts, comments, likes with real-time updates
- **Explore Pages**: Learning platform, insights dashboard, friend finder
- **Database Integration**: PostgreSQL with Prisma ORM
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Production Deployment**: Live on Vercel with database

### 🔄 In Progress
- **Real-time Notifications**: Pusher integration (credentials configured)
- **Friend System**: Connection requests and management
- **Direct Messaging**: Private messaging between users

### 🎯 Future Enhancements
- **Image Upload**: File storage integration (Cloudinary/AWS S3)
- **Content Moderation**: AI-powered content filtering
- **Advanced Analytics**: User engagement metrics
- **Mobile App**: React Native companion app

## 🚀 Deployment

The application is deployed on **Vercel** with:
- **Automatic deployments** from GitHub
- **PostgreSQL database** on Neon (free tier)
- **Environment variables** configured
- **Custom domain** support ready

### Deploy Your Own
1. Fork this repository
2. Connect to Vercel
3. Set environment variables
4. Deploy automatically

## 🤝 Development Guidelines

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (if configured)
- **Component-based**: Modular React architecture

### Performance
- **Server Components**: Leverage React Server Components
- **Image Optimization**: Next.js built-in optimization
- **Database Indexing**: Optimized Prisma queries
- **Caching**: Strategic caching for better performance

## 📝 Development Checklist

- [x] **Project Scaffolding**: Next.js app with TypeScript
- [x] **Authentication System**: JWT-based auth with bcrypt
- [x] **Database Setup**: Prisma ORM with PostgreSQL
- [x] **UI Components**: Responsive design with Tailwind
- [x] **API Routes**: RESTful backend endpoints
- [x] **Social Features**: Posts, comments, likes system
- [x] **Explore Pages**: Learning, insights, find-friends
- [x] **Production Deployment**: Live on Vercel
- [x] **Environment Configuration**: Secure secrets management
- [x] **Documentation**: Comprehensive README and guides

## 🎯 Getting Help

- **Issues**: Open GitHub issues for bugs or feature requests
- **Documentation**: Check the inline code documentation
- **Community**: Join discussions in GitHub Discussions

---

**Built with ❤️ using Next.js, React, and modern web technologies.**

**Live Demo**: [https://buddy-script1-d7cjejbd5-raihanulislam12s-projects.vercel.app](https://buddy-script1-d7cjejbd5-raihanulislam12s-projects.vercel.app)
