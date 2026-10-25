# Cadet Music Platform - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Authentication System](#authentication-system)
4. [User Management](#user-management)
5. [Curriculum & Standards](#curriculum--standards)
6. [Learning Path](#learning-path)
7. [Lesson System](#lesson-system)
8. [Song Selection](#song-selection)
9. [Gamification](#gamification)
10. [Admin Panel](#admin-panel)
11. [Security Features](#security-features)
12. [UI/UX Features](#uiux-features)
13. [Backend Migration Guide](#backend-migration-guide)
14. [Technical Details](#technical-details)

---

## Overview

**Cadet Music Platform** is a comprehensive music learning application designed for Canadian Air Cadets to learn saxophone following the official standards (A-CR-CCP-166/PT-001 and A-CR-CCP-166/PT-004).

### Key Features
- Complete 6-level curriculum (Basic → Level 5)
- Official Canadian Cadet Organization standards compliance
- Interactive lessons with theory and playing components
- Song selection from official prepared music lists
- Gamification with XP, streaks, and achievements
- Customizable banners with sticker placement
- Secret admin panel with password protection
- Session persistence with localStorage
- Dark mode support
- Responsive design

---

## Project Structure

```
src/
├── App.tsx                    # Main app component with routing
├── store.ts                   # Zustand state management
├── data.ts                    # Curriculum data and standards
├── theory.ts                  # Theory curriculum (A-CR-CCP-166/PT-004)
├── index.css                  # Global styles
├── components/
│   ├── Login.tsx              # Authentication (sign in/sign up)
│   ├── Onboarding.tsx         # Placement assessment
│   ├── Dashboard.tsx          # Main learning path view
│   ├── LessonView.tsx         # Lesson content and exercises
│   ├── Songs.tsx              # Song selection interface
│   ├── Settings.tsx           # User settings and level management
│   ├── Leaderboard.tsx        # Rankings and banner display
│   ├── Banner.tsx             # Banner customization
│   ├── AdminPanel.tsx         # Admin dashboard
│   ├── SaxophoneAssembly.tsx  # Interactive assembly animation
│   └── KonamiListener.tsx     # Easter egg listener
└── public/                    # Static assets
```

---

## Authentication System

### Login Methods

#### 1. Rank + Name + Password
- Dropdown selection for rank (Air Cadet → Warrant Officer 1st Class)
- Last name input
- Password (minimum 6 characters)
- Identifier: `{rank}.{lastname}` (lowercase)

#### 2. Email + Password
- Cadet365 email validation (must end with `.cadets.gc.ca`)
- Password (minimum 6 characters)
- Identifier: email address (lowercase)

### Rank Hierarchy
1. Air Cadet
2. Leading Air Cadet
3. Corporal
4. Flight Corporal
5. Sergeant
6. Flight Sergeant
7. Warrant Officer 2nd Class
8. Warrant Officer 1st Class (Chief - restricted)

### Password Storage
- Passwords stored in localStorage under `cadet_music_users`
- Structure: `{ identifier: { password, username, createdAt } }`
- Validation on login: checks stored password against input
- No auto-account creation (must sign up first)

### Session Persistence
- Active session stored in `cadet_music_session`
- "Continue as [User]" quick login option
- Session cleared on admin reset
- Validates user existence before quick login

---

## User Management

### User Data Structure
```typescript
interface User {
  id: string;
  username: string;
  rank: string;
  lastName: string;
  email: string;
  avatar: string;
  instrument: 'alto' | 'tenor' | 'baritone' | 'soprano';
  progress: UserProgress;
  activeSongs: string[];
  theoryLevel: CadetLevel;
  instrumentLevel: CadetLevel;
  onboarded: boolean;
  songsSelected: boolean;
  bannerBg: string;
  bannerStickers: BannerSticker[];
}
```

### Progress Tracking
```typescript
interface UserProgress {
  completedLessons: string[];
  xp: number;
  streak: number;
  lastActiveDate: string;
  level: number;
  accuracy: number;
  stickers: string[];
  goalsCompleted: number;
}
```

### Level System
- **Theory Level**: Basic → Level 5
- **Playing Level**: Basic → Level 5
- Playing level can exceed theory level (with warning)
- Warning: "You won't earn a badge" if playing > theory

---

## Curriculum & Standards

### Technical Standards (A-CR-CCP-166/PT-001)

#### Six Levels
- **Basic**: Awareness
- **Level One**: Basic knowledge, limited skill
- **Level Two**: Basic knowledge, limited skill
- **Level Three**: Detailed knowledge, skilled
- **Level Four**: Detailed knowledge, skilled
- **Level Five**: Comprehensive knowledge, highly skilled

#### Performance Objectives (POs)
1. **PO 450**: Maintenance (Non-critical)
2. **PO 451**: Technique & Rhythm (Critical)
3. **PO 452**: Individual Practice (Critical)
4. **PO 453**: Intonation (Critical from Level 2)
5. **PO 454**: Prepared Music (Critical)
6. **PO 455**: Ensemble (Critical)
7. **PO 456**: Sight Reading (Critical from Level 3)
8. **PO 457**: Aural Skills (Critical from Level 3)
9. **PO 458**: Music Theory (Critical from Level 2)
10. **PO 459**: Band Drill (Critical)
11. **PO 460**: Conducting (Critical from Level 4)

#### Assessment Structure
- **Critical Items**: Complete/Incomplete (60% minimum required)
- **Non-Critical Items**: Satisfactory/Unsatisfactory (don't block progression)

#### Scale Requirements by Level
- **Basic**: Major scales, ♩=60, 1 octave, no memorization
- **Level One**: Major, Chromatic, Harmonic Minor, ♩=66, 1 octave
- **Level Two**: Same types, ♩=72, 1 octave
- **Level Three**: + Melodic Minor, ♪=60, 2 octaves, memorized
- **Level Four**: Same types, ♪=72, 2 octaves, memorized
- **Level Five**: Same types, ♪=80, 2 octaves, memorized, up to 7 accidentals

#### Instrument Transposition
- **Alto Sax (E♭)**: Written major 6th above sounding pitch
- **Tenor Sax (B♭)**: Written major 2nd above sounding pitch

### Theory Program (A-CR-CCP-166/PT-004)

#### Basic Level Topics
- The Staff (5 lines, 4 spaces)
- Note Values (whole, half, quarter, eighth, sixteenth)
- Time Signatures (2/4, 3/4, 4/4, common time)
- Navigation Marks (repeats, endings, D.C., D.S., al Fine, to Coda)
- Dynamics (ppp to fff, crescendo, decrescendo)

#### Level One Topics
- Dotted Notes (single and double dots)
- Tones and Semitones (diatonic and chromatic)
- Accidentals (sharp, flat, natural, double sharp/flat)
- Key Signatures (order of sharps/flats, circle of fifths)
- Minor Scales (natural and harmonic)
- Beats and Tempo (Largo to Presto)
- Articulations (tie, slur, legato, staccato, accent, marcato, tenuto)

#### Level Two Topics
- Triplets
- Compound Time (6/8, 9/8, 12/8)
- Scale Degrees (tonic through leading note)
- Finding the Key
- Intervals (size and quality for seconds and thirds)
- Transposition (octave)

#### Level Three Topics
- All Time Signatures (2/2, 3/2, 3/8, 9/8, 12/16)
- All Intervals (perfect, major, minor, augmented, diminished, inversions)
- Melodic Minor Scale
- Triads (major and minor)
- Tempo and Style Terms
- Transposition by Major 2nd

#### Level Four Topics
- Irregular Time Signatures (5/4, 7/4, 5/8, 7/8)
- Finding Key (No Signature)
- Sixths and Sevenths
- Chords on Scale Degrees
- Cadences (Perfect, Plagal, Imperfect, Deceptive)
- Error Detection
- Transposition by Any Interval (five-step method)
- Advanced Tempo Terms

#### Level Five Topics
- C Clefs (alto and tenor)
- Full Interval Spectrum
- Diminished and Augmented Chords
- Triad Inversions
- Dominant Seventh Chords
- Transposing for Instruments
- Cadence Writing
- Short and Open Score

#### Glossary
- 45+ Italian and French terms
- Categories: Tempo, Dynamics, Articulation, Style, Technique
- Examples: Adagio, Allegro, Forte, Piano, Legato, Staccato

---

## Learning Path

### Curriculum Structure
```
Basic (9 lessons)
├── Meet Your Saxophone
├── Daily Care (PO 450)
├── Posture & Hold (PO 451)
├── First Notes: B, A, G (PO 451)
├── Quarter Notes (PO 451)
├── The Music Staff (PO 458)
├── Note Names (PO 458)
├── Band Drill Basics (PO 459)
└── Basic Assessment (Exam)

Level One (10 lessons)
├── Cork Care (PO 450)
├── Major Scales (PO 451)
├── Chromatic Scale (PO 451)
├── Harmonic Minor (PO 451)
├── Eighth Notes (PO 451)
├── Tuning Basics (PO 453)
├── Key Signatures (PO 458)
├── Sight Reading Intro (PO 456)
├── Drill Movements (PO 459)
└── Level One Assessment (Exam)

Level Two (8 lessons)
├── Pad Care (PO 450)
├── Scales at ♩=72 (PO 451)
├── Additional Keys (PO 451)
├── Intonation Skills (PO 453)
├── Theory Fundamentals (PO 458)
├── Aural Skills (PO 457)
├── Sight Reading (PO 456)
└── Level Two Assessment (Exam)

[Levels 3-5 follow similar structure]
```

### Lesson Types
- **Theory**: Music theory concepts
- **Playing**: Instrument technique
- **Rhythm**: Rhythm and timing exercises
- **Exam**: Level assessments

### Progression Rules
- Must complete lessons in order
- Each lesson unlocks after previous completion
- XP awarded on completion
- Streak maintained with daily activity

---

## Lesson System

### Lesson Structure
```typescript
interface Lesson {
  id: string;
  title: string;
  type: 'theory' | 'playing' | 'rhythm' | 'exam';
  emoji: string;
  topic: string;
  xp: number;
  description: string;
  interactive: boolean;
  level: CadetLevel;
  po?: number;
}
```

### Exercise Types
1. **Multiple Choice**: Select correct answer from options
2. **True/False**: Binary choice questions
3. **Rhythm Tap**: Tap rhythm pattern
4. **Fill Order**: Arrange items in correct order
5. **Note Match**: Match notes to positions

### Interactive Features
- **Saxophone Assembly**: Drag-and-drop parts in correct order
- **Visual Feedback**: Animations for correct/incorrect answers
- **Progress Tracking**: Visual indicators for lesson completion
- **Confetti**: Celebration on lesson completion

### Lesson Content
- **pb-1**: Meet Your Saxophone (with anatomy diagram)
- **pb-2**: Assembly Steps (interactive assembly)
- **n-1**: First Notes: B, A, G (with fingering chart)
- **r-1**: Quarter Notes (with notation examples)
- **t-3**: Dynamics (with dynamics visualization)

---

## Song Selection

### Official Prepared Music Lists

#### Basic Level
**List A:**
- Western Portrait
- Austrian Melody
- The Minstrel Boy

**List B:**
- Ode to Joy
- America / God Save the Queen
- Scarborough Fair

#### Level One
**List A:**
- Abendlied
- Andante
- Winter Dreams
- Aria
- Old Folks at Home
- Annie Laurie
- Lullaby

**List B:**
- Gavotte
- Fandango
- Rigaudon
- Scenes that are Brightest
- Waltz
- March

#### Level Two
**List A:**
- At the Hearth
- Meadowland
- Etude in D Minor
- Andante
- Loreley

**List B:**
- Hunter Chorus
- Polka
- Duet Brillant

#### Level Three (RCM Grade 2)
**List A:**
- Air Gracile
- Allerseelen
- Concerto in B-flat Minor
- Romantic Piece
- Andante Grazioso
- On Wings of Song

**List B:**
- Canzonetta and Giga
- Allegro
- Allegro Moderato
- Allegretto Brillante

#### Level Four (RCM Grade 4)
**List A:**
- Romantic Piece
- Chartreuse
- Introduction and Rondo
- Album-Leaf

**List B:**
- Le Secret
- Minuet
- Sicilienne and Allegro

#### Level Five (RCM Grade 6)
**List A:**
- Elegie
- Recitative and Allegro
- Vocalise
- Nocturne
- Larghetto
- Melodie

**List B:**
- Largo and Allegro
- Gypsy Rondo
- Fantaisie Mauresque
- Concertante
- Andante and Allegro

### Song Selection Rules
- Must select 1 song from List A
- Must select 1 song from List B
- Cannot proceed without selecting songs
- Songs are level-specific
- Can change songs later in Settings

---

## Gamification

### XP System
- Lessons award XP on completion
- Level calculated: `level = floor(xp / 100)`
- XP displayed in header and stats

### Streak System
- Daily login maintains streak
- Streak resets if day missed
- Streak displayed with fire icon
- Streak achievements at 7 and 30 days

### Achievements (Stickers)
- **First Steps**: Complete 5 lessons
- **Dedicated**: Complete 20 lessons
- **500 XP**: Earn 500 XP
- **1000 XP**: Earn 1000 XP
- **Week Streak**: 7-day streak
- **Month Streak**: 30-day streak
- **Theory Master**: Reach Level 3 theory
- **Level 5**: Reach Level 5

### Banner Customization
- 6 gradient backgrounds to choose from
- Place stickers anywhere on banner
- Rotate stickers for variety
- Click to remove placed stickers
- Banner displayed on leaderboard

### Leaderboard
- Top 3 podium with banner previews
- Full rankings with mini banners
- Shows XP, level, streak
- Current user highlighted
- Animated transitions

---

## Admin Panel

### Access Method
**Secret Corner Sequence:**
1. Click bottom-right corner
2. Click top-right corner
3. Click top-left corner
4. Click bottom-left corner

**No visual feedback** - completely hidden from regular users

### Admin Features
- View current user data (demo mode)
- Curriculum progress tree view
- Expandable sections by level
- Lesson completion status
- XP and level tracking
- Streak monitoring

### Reset Functionality
- **Reset All Data** button in admin header
- Requires password: `password`
- Clears all localStorage data
- Deletes all user accounts
- Returns to login screen
- Must sign up again after reset

### Reset Confirmation
- Modal dialog with password input
- Warning box showing what will be deleted
- Cancel option available
- Wrong password shows error

### Future Backend Integration
With proper backend, admin panel would show:
- All cadets' progress in real-time
- Who's struggling with which lessons
- Completion rates per section
- Streak tracking across all users
- Export data to CSV for reports
- Assign songs/levels to specific cadets

---

## Security Features

### Password Validation
- Minimum 6 characters required
- Passwords stored in localStorage
- Validation on every login attempt
- No auto-account creation
- "Account not found" error for non-existent accounts
- "Incorrect password" error for wrong passwords

### Session Management
- Session stored in localStorage
- Quick login validates user existence
- Session cleared on reset
- No cross-device sync (localStorage only)

### Admin Security
- Hidden access method (corner clicks)
- Password-protected reset
- No visual feedback during access
- Reset requires explicit confirmation

### Data Integrity
- Rank dropdown prevents invalid ranks
- Email validation for .cadets.gc.ca domain
- Level validation (theory ≥ playing recommended)
- Song selection required before proceeding

---

## UI/UX Features

### Design System
- **Color Scheme**: Navy (#1a2332) and Gold (#c9a84c)
- **Light Mode**: #f5f5f5 background, #c8c8c8 borders
- **Dark Mode**: #0f1720 background, #2a3545 borders
- **Typography**: Inter font family
- **Animations**: Framer Motion for smooth transitions

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Readable text at all sizes

### Navigation
- Bottom navigation bar with 5 tabs:
  - Home (dashboard)
  - Songs (song selection)
  - Start (next lesson)
  - Ranks (leaderboard)
  - Settings (user settings)
- Sticky headers with back buttons
- Smooth page transitions

### Interactive Elements
- Hover effects on buttons
- Tap feedback on mobile
- Animated progress bars
- Confetti on achievements
- Pulsing available lessons
- Rotating locked icons

### Accessibility
- High contrast colors
- Clear focus states
- Semantic HTML
- Keyboard navigation support
- Screen reader friendly

---

## Backend Migration Guide

### Current State
- All data stored in localStorage
- No real authentication
- No cross-device sync
- Demo mode only

### Recommended Stack

#### Option 1: Vercel + Supabase (Easiest)
- **Frontend**: Vercel (free)
- **Backend**: Supabase (free tier)
- **Database**: PostgreSQL (free 512MB)
- **Auth**: Supabase Auth (free up to 50k users)
- **Storage**: Supabase Storage (free 1GB)

#### Option 2: Custom Backend
- **Frontend**: Vercel/Netlify
- **Backend**: Railway/Render ($5-7/month)
- **Database**: MongoDB Atlas (free tier)
- **Auth**: Custom with bcrypt + JWT
- **Storage**: Cloudinary/Backblaze B2

### Migration Steps

#### Phase 1: Setup Supabase (1 week)
1. Create Supabase account
2. Create new project
3. Set up database tables:
   ```sql
   -- Users table
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     email TEXT UNIQUE,
     rank TEXT,
     last_name TEXT,
     password_hash TEXT,
     instrument TEXT DEFAULT 'alto',
     theory_level TEXT DEFAULT 'Basic',
     instrument_level TEXT DEFAULT 'Basic',
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
     level TEXT,
     list_type TEXT,
     sheet_music_url TEXT,
     audio_url TEXT
   );
   ```
4. Enable authentication
5. Set up storage buckets

#### Phase 2: Connect Frontend (1 week)
1. Install Supabase client:
   ```bash
   npm install @supabase/supabase-js
   ```
2. Create API service files:
   ```typescript
   // src/api/auth.ts
   import { supabase } from './supabaseClient';
   
   export const signUp = async (email: string, password: string, rank: string, lastName: string) => {
     const { data, error } = await supabase.auth.signUp({
       email,
       password,
       options: { data: { rank, last_name: lastName } }
     });
     return { data, error };
   };
   
   export const signIn = async (email: string, password: string) => {
     const { data, error } = await supabase.auth.signInWithPassword({
       email,
       password
     });
     return { data, error };
   };
   ```
3. Replace localStorage calls with Supabase calls
4. Add authentication headers to requests
5. Handle loading states and errors

#### Phase 3: Deploy (1 week)
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Add environment variables:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Deploy frontend
5. Test thoroughly

### Cost Breakdown
- **Development**: $0
- **First 100 users**: $0 (free tiers)
- **100-1000 users**: ~$25/month
- **1000+ users**: ~$50-100/month

### Timeline
- **Learning Supabase**: 3-5 days
- **Setting up database**: 1-2 days
- **Connecting frontend**: 3-5 days
- **Testing and deployment**: 2-3 days
- **Total**: 2-3 weeks

---

## Technical Details

### Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Routing**: React Router
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns

### State Management (Zustand)
```typescript
interface AppState {
  user: User | null;
  darkMode: boolean;
  currentView: ViewType;
  currentLessonId: string | null;
  lessonComplete: boolean;
  adminUnlocked: boolean;
  
  // Actions
  login: (data: LoginData) => void;
  logout: () => void;
  completeLesson: (lessonId: string, xp: number) => void;
  setTheoryLevel: (level: CadetLevel) => void;
  setInstrumentLevel: (level: CadetLevel) => void;
  // ... more actions
}
```

### Data Persistence
- **localStorage keys**:
  - `cadet-music-storage`: Main app state (Zustand persist)
  - `cadet_music_users`: User accounts and passwords
  - `cadet_music_session`: Active session for quick login

### Performance Optimizations
- Lazy loading of components
- Memoization of expensive calculations
- Efficient re-renders with Zustand selectors
- Optimized animations with Framer Motion
- Code splitting with Vite

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires localStorage support
- Requires ES6+ support

---

## Compliance Status

### ✅ Fully Compliant with Standards

#### A-CR-CCP-166/PT-001 (Technical Standards)
- ✅ Six-level system (Basic-Five)
- ✅ All 11 Performance Objectives tracked
- ✅ Critical vs non-critical assessment structure
- ✅ Scale requirements by level and instrument
- ✅ Maintenance tasks by level
- ✅ Intonation standards
- ✅ Sight reading standards

#### A-CR-CCP-166/PT-004 (Theory Program)
- ✅ All 6 levels covered
- ✅ 40 theory topics total
- ✅ Glossary with 45+ terms
- ✅ Instrument-neutral (except transposition)
- ✅ Theory as prerequisite to playing

---

## Testing Guide

### Authentication Testing
1. **Sign Up**: Create new account with rank/name/password
2. **Sign In**: Login with correct credentials
3. **Wrong Password**: Verify error message
4. **Non-existent Account**: Verify "Account not found" error
5. **Quick Login**: Test "Continue as [User]" button
6. **Session Persistence**: Refresh page, verify session maintained

### Curriculum Testing
1. **Placement Assessment**: Answer questions, verify level placement
2. **Lesson Progression**: Complete lessons in order
3. **XP Award**: Verify XP awarded on completion
4. **Level Up**: Verify level increases with XP
5. **Song Selection**: Select songs, verify requirement enforced

### Admin Testing
1. **Access Admin**: Click corners in sequence
2. **View Data**: Verify admin panel shows user data
3. **Reset Data**: Click reset button, enter password
4. **Verify Reset**: Check all data cleared
5. **Re-signup**: Create new account after reset

### Gamification Testing
1. **Streak**: Login daily, verify streak increases
2. **Achievements**: Complete milestones, verify stickers earned
3. **Banner**: Customize banner, place stickers
4. **Leaderboard**: Verify rankings display correctly

---

## Known Limitations

### Current Limitations
- No real backend (localStorage only)
- No cross-device sync
- No file uploads (sheet music, audio)
- No real authentication (passwords in localStorage)
- Demo mode only for admin panel
- No teacher/instructor portal
- No recording/playback features

### Future Enhancements
- Backend integration with Supabase
- Real authentication with JWT
- File uploads for sheet music
- Recording and playback features
- Teacher portal for instructors
- Mobile app (React Native)
- Real-time progress sync
- Advanced analytics
- Practice timer
- Metronome integration

---

## Support & Contact

For questions or issues:
- Review this documentation
- Check browser console for errors
- Verify localStorage is accessible
- Test in different browsers
- Clear browser data and retry

---

## License & Credits

**Standards Compliance:**
- Canadian Cadet Organization Music Standards (A-CR-CCP-166/PT-001)
- Canadian Cadet Organization Theory Program (A-CR-CCP-166/PT-004)
- Issued: 2003-06-01 and 2004-06-01

**Technology:**
- React, TypeScript, Tailwind CSS
- Zustand, Framer Motion
- Vite, Recharts, Lucide React

---

## Version History

### v1.0.0 (Current)
- Complete 6-level curriculum
- Full standards compliance
- Authentication system
- Admin panel with reset
- Gamification features
- Banner customization
- Song selection system
- Interactive lessons
- Dark mode support

---

**Documentation Version**: 1.0.0  
**Last Updated**: 2024  
**Total Features**: 50+  
**Total Lessons**: 27+  
**Total Songs**: 62  
**Total Theory Topics**: 40  
**Total Glossary Terms**: 45+
