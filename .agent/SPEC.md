# 🚀 ByteCode Platform Specification

**Mission:** To provide a productive, identity-driven community for SUST Computer Science students, bridging the gap between academic learning and professional tech insights.

---

## 🏗️ System Architecture

| Layer | Technology | Role |
| --- | --- | --- |
| **Frontend** | React + Tailwind CSS | Client-side rendering, Sanity fetching, UI/UX. |
| **Backend** | NestJS | Business logic, News aggregation, Profile management. |
| **Auth** | Supabase Cloud | OAuth (Google/GitHub) & JWT issuance. |
| **Primary DB** | SQLite3 (via Prisma) | Local storage for Profiles and User metadata. |
| **CMS/CDN** | Sanity.io | Headless CMS for Blogs, Events, and Assets. |
| **Hosting** | GitHub Pages / Docker | Frontend static hosting & Dockerized API. |

---

## 📊 Data Models

### 1. Membership (Relational - SQLite)

* **User:** `id`, `email`, `username`, `password_hash`, `role` (Admin/User).
* **Profile:**
* `name`, `avatar`, `bio`.
* `status`: (⚡ Active, 📚 Studying, 🎯 Goal-oriented, 🏗️ Building).
* `interests`: String array (e.g., `["React", "NestJS", "AI"]`).
* `links`: Object `{ github: string, linkedin: string }`.



### 2. Content (Document - Sanity)

* **Blog Post:**
* `title`, `slug`, `category` (General, Career, Announcement, Experience, Advice).
* `image`, `main_content` (Portable Text with Code Block support).
* `metrics`: `likes`, `comments`, `shares`.


* **Events:**
* `title`, `image`, `category` (Activity, Session).
* `dates`: `start_date`, `end_date`.
* `assets`: Array of Files/Images (Syllabi, Docs, Slides).



---

## 🛠️ Core Services & Logic

### Identity Anchor (Auth Flow)

1. User authenticates via **Supabase OAuth** (Google).
2. NestJS verifies the JWT.
3. If `supabase_id` is missing in **SQLite**, a new Profile is initialized.
4. Subsequent profile edits (bio, interests) are written directly to **SQLite**.

### The News Service (RSS Aggregator)

* **Endpoint:** `GET /api/news`
* **Logic:**
* Check **Memory Cache** (NestJS `CacheModule`).
* If cache miss: Parse RSS via `rss-parser` (TechCrunch, Al-Arabiya).
* **Transformation:** Slice descriptions to 250–300 chars, detect language (AR/EN).
* Return 10 most recent items.



---

## 📱 Sitemap & Page Hierarchy

| Page | Primary Function | Data Source |
| --- | --- | --- |
| **Blogs** | Feed of all admin-posted articles. | Sanity |
| **Single Blog** | Full article view with code highlighting. | Sanity |
| **Events** | List of upcoming university sessions. | Sanity |
| **Single Event** | Event details + Asset download section. | Sanity |
| **Explore** | Search bar for users (by interest) and content. | SQLite + Sanity |
| **News** | 10 latest tech news cards (Multi-language). | NestJS (RSS) |
| **Profile** | Public-facing "Digital Business Card." | SQLite |
| **Settings** | UI for editing Profile, Theme, and Language. | SQLite |

---

## 🎨 UI/UX Specifications

* **First Mobile:** Always consider mobile style compatibility first.
* **Theme:** Dark Mode (Deep Slate) / Light Mode (Crisp Gray).
* **Layout:** Bento Box (Dashboard) & Glassmorphism (Cards).
* **Typography:**
* **English:** Inter (Geometric Sans).
* **Arabic:** Tajawal (Modern Sans).


* **Responsive:** Mobile-first (essential for students on the move).

---

## 📦 Deployment Plan

1. **Frontend:** Build React app → Deploy to **GitHub Pages** (utilizing `js.org` domain).
2. **Backend:** Dockerize NestJS + SQLite DB.
3. **Persistence:** Use Docker Volumes to ensure the `.sqlite` file survives container restarts.

---

### Implementation Priority (The "Battle Plan")

0. **Phase 0:** Scafold the frontned first. Make sure it is responsive and mobile-first. Use TailwindCSS and Framer motion.
1. **Phase 1:** Auth & SQLite Profile setup (The Foundation).
2. **Phase 2:** Sanity Integration for Blogs/Events (The Content).
3. **Phase 3:** News Service & RSS Parsing (The Automation).
4. **Phase 4:** Search & Explore logic (The Community).