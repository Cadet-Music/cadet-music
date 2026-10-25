# All Your Questions Answered

## 1. "Can I use Vercel for backend?"

**Short answer:** Vercel hosts frontend really well, but for a backend you need something more.

**Options:**

### Option A: Vercel + Supabase (RECOMMENDED - Easiest)
- **Vercel**: Hosts your React app (free)
- **Supabase**: Provides database, authentication, file storage (free tier)
- **How it works**: Your React app calls Supabase APIs directly
- **Cost**: Free to start, ~$25/month when you grow

### Option B: Vercel + Next.js API Routes
- Convert your app to Next.js
- Use `/api` routes as backend
- Still need a database (Supabase, PlanetScale, or MongoDB Atlas)
- More complex but all in one project

### Option C: Separate Backend (Most Control)
- **Backend**: Railway.app, Render.com, or Fly.io ($5-7/month)
- **Database**: MongoDB Atlas or Supabase (free tier)
- **Frontend**: Vercel (free)
- Most flexible but more work

**My recommendation:** Start with **Vercel + Supabase**. It's the fastest path to production.

---

## 2. "Why is there only mock data and my data isn't showing?"

**The truth:** Right now, ALL data is stored in your browser's localStorage. This means:
- Only YOU can see your data
- Data is tied to your specific browser/device
- If you clear browser data, it's gone
- No one else (including admins) can see it

**This is why the admin panel shows "Demo Mode"** - there's no real backend to pull data from.

**To fix this:** You need a backend (see section 1). Once set up:
- All cadets' data goes to a shared database
- Admins can see everyone's progress
- Data persists across devices
- Real authentication works

---

## 3. "Why isn't my progress saved?"

**It IS saved** - but only in YOUR browser's localStorage.

**How it works now:**
- Zustand (state management) uses `persist` middleware
- Data saves to `localStorage` under key `cadet-music-storage`
- When you reload the page, your data comes back
- But it's ONLY on that specific browser/device

**To make progress save across devices:**
- Need backend database
- User logs in → data loads from database
- Progress syncs in real-time

---

## 4. "How would migration to server work?"

### Step-by-Step Migration Plan:

**Week 1-2: Set up Supabase**
1. Create account at supabase.com
2. Create a new project
3. Set up database tables (Users, Progress, Songs)
4. Enable authentication
5. Set up file storage bucket

**Week 3: Connect Frontend**
1. Install Supabase client: `npm install @supabase/supabase-js`
2. Create API service files:
   ```
   src/api/
     auth.ts      (login, signup, logout)
     progress.ts  (save/load progress)
     songs.ts     (fetch songs)
   ```
3. Replace localStorage calls with Supabase calls
4. Test thoroughly

**Week 4: Deploy**
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Add environment variables (Supabase URL, keys)
4. Deploy!

### What you need to set up:

**Environment Variables:**
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Database Tables:**
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  rank TEXT,
  last_name TEXT,
  instrument TEXT DEFAULT 'alto',
  theory_level INT DEFAULT 0,
  instrument_level INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Progress table
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  lesson_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  attempts INT DEFAULT 0,
  score INT DEFAULT 0,
  completed_at TIMESTAMP
);

-- Songs table
CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  composer TEXT,
  level INT,
  list_type TEXT, -- 'basic', 'A', 'B'
  sheet_music_url TEXT,
  audio_url TEXT
);
```

**Do you need to manually set up variables?**
Yes, but it's straightforward:
1. Create Supabase project → get URL and keys
2. Add to Vercel environment variables
3. That's it!

---

## 5. "Why can't I upload files?"

**Current limitation:** This is a static frontend app. File uploads require:
1. A server to receive the file
2. Storage to save it (database or cloud)
3. A way to serve it back

**Once you have Supabase:**
- File uploads work via Supabase Storage
- Upload sheet music (PDF), audio files (MP3)
- Store URLs in database
- Serve to users when needed

**Example code (after backend setup):**
```typescript
import { supabase } from './supabaseClient';

const uploadSheetMusic = async (file: File, songId: string) => {
  const { data, error } = await supabase.storage
    .from('sheet-music')
    .upload(`${songId}/${file.name}`, file);
  
  if (error) throw error;
  
  // Get public URL
  const { data: urlData } = supabase.storage
    .from('sheet-music')
    .getPublicUrl(data.path);
  
  return urlData.publicUrl;
};
```

---

## What I've Implemented in This Update

### ✅ Login System
- **Two login methods:** Rank+Last Name+Password OR Email+Password
- **Session persistence:** "Continue as [user]" quick login
- **Email validation:** Must end with .cadets.gc.ca

### ✅ Navigation (Separate Pages)
- **Home** - Dashboard with learning path
- **Songs** - Dedicated song selection page (forced)
- **Start** - Quick access to next lesson
- **Ranks** - Leaderboard with banners
- **Settings** - Profile, instrument, levels, songs

### ✅ Forced Song Selection
- Can't proceed without choosing songs
- Level-based song lists (Basic, List A, List B)
- Warning modal if trying to continue without songs

### ✅ Level Selection with Validation
- Choose theory level (0-4)
- Choose playing level (0-4)
- **Playing level cannot exceed theory level**
- Warning popup if you try

### ✅ Leaderboard with Banners
- Customizable banner backgrounds
- Earn stickers from goals
- Place stickers anywhere on banner
- Top 3 podium with banner previews
- Full rankings with mini banners

### ✅ Banner Customization Page
- 6 background gradients to choose from
- Click to place stickers
- Click placed sticker to remove
- Preview in real-time

### ✅ Improved Onboarding
- 10-question assessment (basic, intermediate, advanced)
- No right/wrong feedback (subtle animation only)
- Level selection step after assessment
- Theory ≥ Playing validation

### ✅ Settings Improvements
- Levels tab with theory/playing selection
- Warning modal for invalid level combinations
- Profile stats
- Instrument selection
- Song management

### ✅ Admin Panel (Tree View)
- Expandable sections showing lessons
- Progress bars per section
- Completed/total counts
- Demo mode (shows your own data)
- Info about what backend would enable

### ✅ Secret Admin (No Visual Feedback)
- Corner sequence: BR → TR → TL → BL
- Completely invisible to users
- No hints, no dots, no messages

---

## What's Still Needed (Backend)

### Must-Have for Production:
1. **Authentication** - Real login with password hashing
2. **Database** - Store all users' progress
3. **File Storage** - Sheet music, audio files
4. **Admin Access** - See all cadets' data

### Nice-to-Have:
1. **Teacher Portal** - Assign songs, track students
2. **Recording** - Record practice sessions
3. **Real-time** - Live progress updates
4. **Mobile App** - React Native version

---

## Recommended Tech Stack

**For quickest path to production:**

```
Frontend: React + Vite + Tailwind (already done)
  ↓
Hosting: Vercel (free)
  ↓
Backend: Supabase (free tier)
  - PostgreSQL database
  - Authentication
  - File storage (1GB free)
  - Real-time subscriptions
  ↓
File Storage: Supabase Storage or Cloudinary
```

**Cost breakdown:**
- Development: $0
- First 100 users: $0 (free tiers)
- 100-1000 users: ~$25/month
- 1000+ users: ~$50-100/month

**Timeline:**
- Learn Supabase basics: 3-5 days
- Set up database: 1-2 days
- Connect frontend: 3-5 days
- Test and deploy: 2-3 days
- **Total: 2-3 weeks**

---

## Next Steps for You

### Immediate (This Week):
1. ✅ Review all the changes I've made
2. ✅ Test the app thoroughly
3. ✅ Create a Supabase account
4. ✅ Read the Supabase docs (supabase.com/docs)

### Short Term (Next 2 Weeks):
1. Set up Supabase project
2. Create database tables
3. Add authentication
4. Connect frontend to Supabase
5. Test with real users

### Medium Term (Next Month):
1. Deploy to Vercel
2. Add file uploads (sheet music)
3. Build admin features
4. Onboard real cadets

### Long Term:
1. Add more songs/levels
2. Build teacher portal
3. Create mobile app
4. Add recording features

---

## Questions?

If you need help with any specific part of the migration, let me know:
- Setting up Supabase?
- Database schema design?
- Connecting frontend?
- Deploying to Vercel?
- File upload implementation?

I can provide detailed code examples for any of these!
