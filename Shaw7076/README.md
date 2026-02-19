# 🎓 College Exam Seat Planner

## Objective
Develop a web application to allocate classrooms for exams using the minimum number of rooms while preferring lower-floor classrooms.

## Features
- Add classroom details
- View all classrooms
- Allocate exam seats using greedy logic
- Error handling for insufficient capacity

## Allocation Logic
Classrooms are sorted by floor number in ascending order. Rooms are allocated one by one until the total seating capacity satisfies the required number of students.

## Tech Stack
- React
- Vite
- JavaScript
- CSS
- Vercel (Deployment)

## Live Demo
👉 https://college-exam-seat-planner.vercel.app/

## How to Run Locally
```bash
npm install
npm run dev
