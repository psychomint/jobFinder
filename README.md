# 💼 jobFinder - Fullstack Job Portal

A modern job portal web app built using **MERN Stack** (MongoDB + Express.js + React + Node.js).  
Users can apply for jobs, companies can post jobs, and both parties can track everything in their dashboards.

## 🌐 Live Site

**Frontend + Backend (Combined Deployment):**  
🔗 [https://job-finder-bice-psi.vercel.app]

⚠️ **Note:** Backend Render server may take **30-50 seconds** to wake up (Free Tier).  
ek request pe error aayega — 2 baar refresh kar lo bhaii

---

## 🚀 Project Highlights

### 👤 For Users
- Register/Login (JWT Auth)
- Upload Resume, Avatar, Cover Image
- Apply to Jobs
- Track Application Status
- View Profile Stats, Application Trends, Skill Analysis

### 🏢 For Companies
- Post / Update / Delete Jobs
- View Applicants by Job
- Company Profile Upload (Logo etc.)

---

## 🧠 Tech Stack

### 🛠 Backend (Node.js + Express)
- Express.js REST API
- MongoDB + Mongoose
- JWT Authentication & Middleware
- Cloudinary + Multer (Image/Resume Uploads)
- Serverless compatible (Render deploy with `serverless-http`)
- Nodemailer (Forgot Password + Test Email)
- Role-based APIs (User, Company)

### 💻 Frontend (React + Vite)
- React + Vite
- TailwindCSS + ShadCN + Radix UI
- Redux Toolkit + Redux Persist
- Zod + React Hook Form for validation
- Charts with Chart.js
- Protected Routes + Auth0 (if extended)
- Framer Motion Animations

---


## 🔧 Setup Instructions

### 1 Backend Setup

```bash
cd backend
npm install
npm start


| Endpoint                           | Method | Description                 |
| ---------------------------------- | ------ | --------------------------- |
| `/api/v1/user/register`            | POST   | Register User               |
| `/api/v1/user/login`               | POST   | Login User                  |
| `/api/v1/job/post`                 | POST   | Post New Job (Company Only) |
| `/api/v1/job/allJobs`              | GET    | View All Jobs               |
| `/api/v1/application/applyJob/:id` | GET    | Apply for a Job (User)      |
| `/api/v1/dashboard/stats`          | GET    | View User Stats             |
| `/api/v1/dashboard/global-stats`   | GET    | Global Job/Company Stats    |


| Feature             | Stack Used                      |
| ------------------- | ------------------------------- |
| Profile Score Logic | Express + MongoDB Aggregation   |
| Application Trends  | MongoDB Aggregation Pipeline    |
| Company Job Posting | Protected JWT + File Upload     |
| Charts + Dashboard  | React + Chart.js + Tailwind CSS |
| Animations & UI     | Framer Motion + Radix + ShadCN  |

```
### 2 Backend Setup


```bash
cd frontend
npm install
npm run dev
```
