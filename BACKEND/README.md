# KaziFlow

**Focus. Flow. Finish.**

KaziFlow is a context-aware task management application that helps you organize your work based on energy levels and task status. Built with a modern tech stack, it provides an intuitive Kanban board interface to manage tasks across different stages: Backlog, Today, In Progress, Review, and Done.

## 🎯 Features

- **Energy-Based Task Organization** - Categorize tasks by effort level (Low, Medium, High)
- **Kanban Board Interface** - Visual workflow with drag-and-drop functionality
- **Tag System** - Organize tasks with custom tags
- **Real-time Updates** - Instant synchronization across all views
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Dark/Light Theme** - Toggle between themes for comfortable viewing

## 🏗️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **TanStack Query** - Data fetching and state management
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Backend
- **FastAPI** - Modern Python web framework
- **SQLModel** - SQL database ORM with Pydantic models
- **SQLite/PostgreSQL** - Database (configurable)
- **Uvicorn** - ASGI server
- **Python 3.11+** - Programming language

## 📁 Project Structure

```
AIBOS/
├── BACKEND/
│   ├── app/
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── models.py            # Database models and schemas
│   │   ├── crud.py              # Database operations
│   │   ├── database.py          # Database connection setup
│   │   └── routers/
│   │       ├── tasks.py         # Task API endpoints
│   │       └── tags.py          # Tag API endpoints
│   ├── .env.example             # Environment variables template
│   ├── requirements.txt         # Python dependencies
│   ├── run.ps1                  # PowerShell run script
│   ├── smoke_test.py            # API integration tests
│   └── README.md                # This file
│
└── FRONTEND/
    └── my-todo_app/
        ├── src/
        │   ├── components/
        │   │   ├── KanbanBoard.tsx      # Main board component
        │   │   ├── KanbanColumn.tsx     # Column component
        │   │   ├── TaskCard.tsx         # Task card component
        │   │   ├── TaskDetailsDialog.tsx # Task edit dialog
        │   │   ├── AddTaskDialog.tsx    # Task creation dialog
        │   │   └── ui/                  # Radix UI components
        │   ├── hooks/
        │   │   ├── useTasks.ts          # Task data hooks
        │   │   └── useTags.ts           # Tag data hooks
        │   ├── services/
        │   │   ├── http.ts              # HTTP client
        │   │   ├── tasks.ts             # Task API service
        │   │   └── tags.ts              # Tag API service
        │   ├── types/
        │   │   └── task.tsx             # TypeScript type definitions
        │   ├── pages/
        │   │   ├── Index.tsx            # Main page
        │   │   └── NotFound.tsx         # 404 page
        │   ├── lib/
        │   │   ├── config.ts            # App configuration
        │   │   └── utils.ts             # Utility functions
        │   ├── App.tsx                  # App component
        │   ├── main.tsx                 # Entry point
        │   └── index.css                # Global styles
        ├── public/
        │   └── logo.png                 # KaziFlow logo
        ├── package.json                 # npm dependencies
        ├── vite.config.ts               # Vite configuration
        ├── tsconfig.json                # TypeScript configuration
        └── .env.local                   # Frontend environment variables
```

## 🚀 Getting Started

### Prerequisites

- **Python 3.11+** installed
- **Node.js 18+** and npm installed
- **PowerShell** (Windows) or Bash (Linux/Mac)

### Backend Setup

1. Navigate to the backend folder:
```powershell
cd BACKEND
```

2. Create a virtual environment:
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1  # Windows
# source .venv/bin/activate  # Linux/Mac
```

3. Install dependencies:
```powershell
pip install -r requirements.txt
```

4. Create your `.env` file:
```powershell
Copy-Item .env.example .env -Force
```

5. Run the server:
```powershell
./run.ps1
```

The backend API will be available at [http://localhost:8000](http://localhost:8000)
API documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

### Frontend Setup

1. Navigate to the frontend folder:
```powershell
cd FRONTEND/my-todo_app
```

2. Install dependencies:
```powershell
npm install
```

3. Create your `.env.local` file:
```powershell
Copy-Item .env.example .env.local -Force
```

4. Start the development server:
```powershell
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173)

## 🔧 Configuration

### Backend Environment Variables

Copy `.env.example` to `.env` and edit values:

- `DATABASE_URL` — Database connection string
  - Default: `sqlite:///./aibos.db`
  - PostgreSQL example: `postgresql+psycopg://user:pass@host:5432/aibos`
- `ALLOWED_ORIGIN` — Frontend origin for CORS (default: `http://localhost:5173`)
- `CORS_ALLOW_ALL` — Set to `true` to allow all origins (development only)

### Frontend Environment Variables

Copy `.env.example` to `.env.local`:

- `VITE_API_URL` — Backend API URL (default: `http://localhost:8000/api`)

## 📡 API Endpoints

### Tasks
- `GET /api/tasks` — List all tasks
- `POST /api/tasks` — Create a new task
- `GET /api/tasks/{id}` — Get a specific task
- `PATCH /api/tasks/{id}` — Update a task
- `DELETE /api/tasks/{id}` — Delete a task

### Tags
- `GET /api/tags` — List all tags
- `POST /api/tags` — Create a new tag

### Health Check
- `GET /healthz` — Health check endpoint

## 🧪 Testing

Run backend smoke tests:
```powershell
cd BACKEND
python smoke_test.py
```

## 🎨 Task Statuses

- **Backlog** - Tasks planned but not started
- **Today** - Tasks scheduled for today
- **In Progress** - Currently active tasks
- **Review** - Tasks awaiting review
- **Done** - Completed tasks

## 💪 Energy Levels

- **🌱 Low Effort** - Quick, simple tasks
- **⚡ Medium Effort** - Moderate complexity tasks
- **🔥 High Effort** - Complex, demanding tasks

## 🔒 Security Notes

- Never commit `.env` files to version control
- Only commit `.env.example` with placeholder values
- The repo-level `.gitignore` excludes all `.env` files and build artifacts

## 📝 License

© 2025 KaziFlow

## 🤝 Contributing

This is a personal project. Feel free to fork and adapt for your own use.

---

**Focus. Flow. Finish.**