# FocusFlow - Productivity & Habit Streak Tracker

A modern web application built for your developer portfolio. It combines a To-Do list with daily habit streak tracking and a GitHub-style productivity heatmap, all persisting locally in your browser.

## Features
- **Task Management**: Add, toggle, delete, and filter pending/completed tasks.
- **Streak Tracking**: Built-in algorithm accurately calculates your current and longest streak based on tasks completed across days.
- **Productivity Heatmap**: Visual GitHub-style calendar dynamically color-codes each day by productivity levels.
- **Local Storage**: Completely backend-free. Uses robust custom LocalStorage hooks.
- **Design System**: Fully responsive glassmorphic UI via Tailwind v4 with smooth micro-animations.
- **Dark Mode**: Flawless system/toggleable light and dark mode integrated with Tailwind's core variables.
- **Modern React**: 100% Functional components, hooks, date-fns, lucide-react, context-free state management.

## Project Structure
```text
my_to_do_app/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React UI features
│   │   ├── Calendar.jsx    # The month-view heatmap
│   │   ├── CalendarDay.jsx # Individual heatmap days
│   │   ├── Header.jsx      # Theme toggle and app branding
│   │   ├── StatsPanel.jsx  # KPI widgets (streak, completed today, rate)
│   │   ├── StreakCounter.jsx
│   │   ├── TaskFilters.jsx
│   │   ├── TaskInput.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js # Generic persistence hook
│   │   ├── useTasks.js        # Core domain logic
│   │   └── useTheme.js        # Dark mode management
│   ├── utils/
│   │   └── cn.js              # Tailwind class merging 
│   ├── App.jsx             # Main container integrating all components
│   ├── index.css           # Tailwind v4 globals & theme variables
│   └── main.jsx            # React root injection
├── package.json            # Scripts & dependencies
├── tailwind.config.cjs     # (v4 Vite plugin used in vite.config.js instead)
└── vite.config.js          # Vite config
```

## Example Data Structure (LocalStorage)
**Key: `productivity-tasks`**
```json
[
  {
    "id": "e6f42a1b-3c5d",
    "title": "Review PRs for the new auth flow",
    "completed": true,
    "createdAt": "2026-03-10T08:00:00.000Z",
    "completedAt": "2026-03-10T09:30:00.000Z"
  }
]
```

**Key: `productivity-streak`**
```json
{
  "current": 5,
  "longest": 12,
  "lastActiveDate": "2026-03-10T00:00:00.000Z"
}
```

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.
