# Cadet Music Platform - Backend Migration Guide

## Current State
The app currently uses **localStorage** for session persistence and **Zustand** for state management. All data is stored locally in the browser.

## What You Need for Production

### 1. Backend Server
**Recommended Stack:**
- **Node.js + Express** (easiest to learn, JavaScript everywhere)
- OR **Python + FastAPI** (if you prefer Python)
- OR **Next.js API Routes** (if you want to keep everything in one project)

**What the backend needs to do:**
- User authentication (login/signup with email validation)
- Store user progress (lessons completed, XP, streaks)
- Store admin data (all cadets' progress)
- Handle file uploads (sheet music, recordings)
- Manage music levels and song assignments

### 2. Database
**Recommended:** PostgreSQL or MongoDB

**Tables/Collections needed:**
```
Users:
- id, email, rank, lastName, password (hashed)
- instrument, theoryLevel, instrumentLevel
- createdAt, lastActive

Progress:
- userId, lessonId, completed, attempts, score
- completedAt

Songs:
- id, title, composer, level, instrument
- sheetMusicUrl, audioUrl

Admin:
- adminId, canViewAllStudents
```

### 3. File Upload Solution
**Why you can't upload files now:**
- Current app is static (HTML/CSS/JS only)
- No server to receive and store files
- Browser security prevents direct file system access

**Solutions:**
1. **Cloud Storage** (easiest):
   - AWS S3, Google Cloud Storage, or Cloudinary
   - Upload directly from browser to cloud
   - Store URLs in database

2. **Server Storage**:
   - Your backend receives files
   - Saves to server disk or cloud
   - Returns URL to frontend

3. **For Sheet Music**:
   - Use PDF.js to display PDFs
   - Store PDFs in cloud storage
   - Or use MusicXML format for interactive scores

### 4. Authentication
**Current:** Fake login (any credentials work)
**Production needs:**
- Real password hashing (bcrypt)
- JWT tokens for sessions
- Email verification for .cadets.gc.ca domains
- Password reset functionality

### 5. Migration Steps

**Phase 1: Setup Backend (1-2 weeks)**
```bash
# Create backend project
mkdir cadet-music-backend
cd cadet-music-backend
npm init -y
npm install express cors bcrypt jsonwebtoken mongoose
```

**Phase 2: Database Setup (2-3 days)**
- Install MongoDB or PostgreSQL
- Create schemas for Users, Progress, Songs
- Set up database connection

**Phase 3: API Endpoints (1 week)**
```
POST /api/auth/signup
POST /api/auth/login
GET /api/user/progress
POST /api/lesson/complete
GET /api/admin/students
GET /api/songs?level=1
POST /api/upload/sheet-music
```

**Phase 4: Connect Frontend (3-5 days)**
- Replace localStorage calls with API calls
- Add authentication headers to requests
- Handle loading states and errors

**Phase 5: Deploy (2-3 days)**
- Backend: Railway, Render, or DigitalOcean
- Frontend: Vercel, Netlify, or Cloudflare Pages
- Database: MongoDB Atlas or Supabase

## Recommended Services (Free Tiers)

**Backend Hosting:**
- Railway.app (easiest, $5 free credit)
- Render.com (free tier available)
- Fly.io (free tier)

**Database:**
- MongoDB Atlas (free 512MB)
- Supabase (free PostgreSQL)
- PlanetScale (free MySQL)

**File Storage:**
- Cloudinary (free 25GB)
- AWS S3 (free 5GB for 12 months)
- Backblaze B2 (cheapest long-term)

**Authentication:**
- Clerk (free up to 10k users)
- Auth0 (free up to 7k users)
- Or build your own with bcrypt + JWT

## Code Structure for Migration

**Current frontend structure:**
```
src/
  components/
  store.ts (Zustand with localStorage)
  data.ts (mock data)
```

**Production structure:**
```
frontend/ (this app)
  src/
    api/
      auth.ts (login/signup API calls)
      progress.ts (save/load progress)
      songs.ts (fetch songs)
    components/
    store.ts (Zustand, but calls API instead of localStorage)

backend/ (new project)
  src/
    routes/
      auth.ts
      progress.ts
      songs.ts
      admin.ts
    models/
      User.ts
      Progress.ts
      Song.ts
    middleware/
      auth.ts (JWT verification)
  server.ts
```

## Estimated Timeline
- **Learning backend basics:** 2-3 weeks
- **Building MVP backend:** 2-3 weeks
- **Connecting frontend:** 1 week
- **Testing & deployment:** 1 week
- **Total:** 6-8 weeks part-time

## Alternative: Use a Backend-as-a-Service
If you want to skip building a backend:

**Supabase** (recommended for beginners):
- PostgreSQL database
- Built-in authentication
- File storage
- Real-time subscriptions
- Free tier: 500MB database, 1GB storage

**Firebase:**
- NoSQL database
- Authentication
- File storage
- Free tier: 1GB storage, 50k reads/day

**What changes with BaaS:**
- No need to build backend server
- Call Supabase/Firebase directly from frontend
- Still need to learn their APIs
- Less control but much faster to build

## Next Steps
1. **Decide:** Build custom backend OR use Supabase/Firebase?
2. **Learn:** Basic Node.js/Express OR Supabase docs
3. **Start small:** Just get login working with real database
4. **Expand:** Add progress tracking, then file uploads
5. **Deploy:** Get it online for real cadets to use

## File Upload Question
**Why you can't upload files in this interface:**
- This is a browser-based code editor
- Can't access your local file system
- Can't run a backend server

**How to add file uploads to your app:**
1. Set up backend with file upload endpoint
2. Use `<input type="file">` in React
3. Send file to backend via FormData
4. Backend saves to cloud storage
5. Return URL to store in database

**Example code (once you have backend):**
```typescript
// Upload sheet music
const uploadSheetMusic = async (file: File, songId: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('songId', songId);
  
  const response = await fetch('/api/upload/sheet-music', {
    method: 'POST',
    body: formData,
  });
  
  const { url } = await response.json();
  return url;
};
```
