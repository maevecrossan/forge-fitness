# 🏋️ Forge Fitness - Project Roadmap

---

## 🏗️ Phase 1 - MVP: Core Functionality
**Goal:** Users can create, save, and view workouts.

### 🗃️ Database & Exercise Library
- [X] Create database schema for exercises  
- [X] Define exercise attributes (name, type, muscle group, equipment, etc.)  
- [X] Seed database with preset exercises (weights, cardio, mobility, etc.)  
- [ ] Add filtering by workout type (weights, cardio, etc.)  
- [X] Implement backend API for fetching exercises  
- [X] Build front-end list/grid to display exercises  
- [ ] Add search bar for exercise names  
- [ ] Add filter UI (by muscle group, type)

### 🏋️ Custom Exercises
- [ ] Build “Add Custom Exercise” form  
- [ ] Add fields for name, description, muscle group(s)  
- [ ] Allow image/icon selection for custom exercise  
- [ ] Connect form to backend (store in user’s collection)  
- [ ] Display custom exercises alongside preset ones  

### 📋 Workouts & Programs
- [ ] Create database schema for workouts  
- [ ] Add relationship between workouts ↔ exercises  
- [ ] Build “Create Workout” flow (add/remove exercises)  
- [ ] Add editable fields for reps, sets, weight, rest time  
- [ ] Implement “Save Workout” button  
- [ ] Add ability to view, edit, and delete workouts  
- [ ] Build “Start Workout” page (basic read-only version)  
- [ ] Add workout timer or simple “complete” marker  

### 👤 User Profile (Local Only)
- [ ] Create user profile schema  
- [ ] Show saved workouts in profile view  
- [ ] Add basic “Edit Profile” (name, avatar, etc.)  
- [ ] Implement streak counter (based on completed workouts)  
- [ ] Display streak count in profile  

### 🖼️ Visuals & Defaults
- [ ] Build library of default cover images  
- [ ] Allow user to assign a cover image to a workout/program  
- [ ] Store chosen image reference in workout data  

---

## 🔐 Phase 1.5 – Authentication Setup
**Goal:** Establish user identity early for social, tracking, and data security.

- [ ] Implement authentication using Auth.js (NextAuth)  
- [ ] Add email + Google OAuth providers  
- [ ] Create login/logout UI and persistent session  
- [ ] Link workouts and profiles to authenticated users  
- [ ] Protect routes (only owners can edit/delete their workouts)

---

## 🌐 Phase 2 – Social & Sharing
**Goal:** Enable users to share and discover workouts.

### 🔗 Public/Private Visibility
- [ ] Add “public/private” toggle to each workout/program  
- [ ] Modify profile to show public workouts only to others  
- [ ] Add backend logic for visibility filtering  

### 🧭 Search & Discovery
- [ ] Implement search endpoint for users/workouts/programs  
- [ ] Build frontend search bar with result tabs (Users / Workouts / Programs)  
- [ ] Add filters (difficulty, duration, tags, etc.)  
- [ ] Add sorting (most favourited, newest, etc.)

### ❤️ Social Interactions
- [ ] Add “favourite” button to workouts  
- [ ] Show favourite count on workout cards  
- [ ] Display list of workouts a user has favourited  
- [ ] Add optional notifications when a workout is favourited  

### 🗂️ Organisation
- [ ] Create database schema for folders  
- [ ] Build “Create Folder” modal  
- [ ] Add “Save to Folder” option on workouts  
- [ ] Show folders in user profile  
- [ ] Enable rename/delete folder actions  

---

## 📊 Phase 3 – Progress Tracking & Analytics
**Goal:** Increase engagement and retention.

### 📆 Tracking Workouts
- [ ] Add ability to “Start Workout” and log actual sets/reps done  
- [ ] Store workout logs with date/time  
- [ ] Track completion streaks automatically  
- [ ] Display workout history graph (basic chart)  
- [ ] Add personal records (max weight per exercise)  
- [ ] Show progress per muscle group  

### ⏰ Scheduling & Reminders
- [ ] Add calendar view of completed workouts  
- [ ] Allow users to plan workouts for future days  
- [ ] Optional: push/email reminders (if notifications enabled)  

### 🏅 Gamification
- [ ] Add achievements (e.g., “10-day streak”)  
- [ ] Add badges to profile  
- [ ] Optional: leaderboards for streaks or favourites  

---

## ☁️ Phase 3.5 – AWS Integration (Infra & Automation)
**Goal:** Introduce AWS to handle media storage & scheduled jobs, gaining real cloud experience without disrupting the app.

### 🪣 S3 Media Storage
- [ ] Create S3 bucket for cover images / avatars / exercise demos  
- [ ] Configure IAM user or role with least-privilege permissions  
- [ ] Add Next.js API route to generate pre-signed upload URLs  
- [ ] Store S3 file URLs in database and render in UI  
- [ ] (Optional) Add CloudFront CDN in front of S3  

### ⚙️ Lambda + EventBridge Jobs
- [ ] Write function to recalculate streaks/PRs daily  
- [ ] Deploy as AWS Lambda  
- [ ] Schedule with EventBridge (CRON)  
- [ ] Update user profile streak/PR data from Lambda  
- [ ] Enable CloudWatch logs for Lambda runs  

### 🧾 Docs & Security
- [ ] Create `docs/aws.md` documenting bucket, IAM, Lambda, and schedules  
- [ ] Add AWS keys/bucket names to environment variables (.env)  
- [ ] Confirm no credentials are committed to Git  

---

## 🔒 Phase 4 – Community & Moderation
**Goal:** Handle scale and user-generated content safely.

### 🧍 User System Enhancements
- [ ] Add verified trainer role (optional)  
- [ ] Allow following/unfollowing other users  
- [ ] Display follower counts  

### 🧹 Content Moderation
- [ ] Add report button on public workouts  
- [ ] Admin dashboard to review reports  
- [ ] Add content flagging in database  
- [ ] Define visibility rules for flagged content  

### 🌍 Global Support
- [ ] Add unit preferences (lbs/kg, miles/km)
- [ ] Store user preferences in profile  

### 🖼️ Advanced Media Upload Enhancements
- [ ] Allow users to upload custom exercise videos with validation  
- [ ] Moderate user-uploaded media content  
- [ ] Extend S3/CloudFront configuration for videos and large files  

---

## ✅ Version Summary
| Phase | Focus | Outcome |
|--------|--------|---------|
| **1** | Core CRUD, workouts, profiles | Functional local app |
| **1.5** | Authentication | Secure user identity |
| **2** | Social & discovery | Share and favourite workouts |
| **3** | Tracking & analytics | Streaks, PRs, progress graphs |
| **3.5** | AWS integration | Cloud media + automated jobs |
| **4** | Community & moderation | Scalable, safe social platform |