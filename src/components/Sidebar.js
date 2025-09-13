import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 

const projectsSample = [
  { id: 1, name: "Website Redesign", status: "In Progress" },
  { id: 2, name: "Mobile App Development", status: "To Do" },
  { id: 3, name: "Marketing Campaign", status: "Done" },
];

const tasksSample = [
  { id: "t1", title: "Create wireframes", status: "To Do", checked: false },
  { id: "t2", title: "Design mockups", status: "In Progress", checked: true },
  { id: "t3", title: "Review with team", status: "In Progress", checked: true },
  { id: "t4", title: "Blocked", status: "Blocked", checked: false },
];

const STATUS_ORDER = ["To Do", "In Progress", "Done", "Blocked"];

function Sidebar({ current, setCurrent }) {
  return (
    <aside className="d-flex flex-column justify-content-between bg-white rounded shadow p-4" style={{ minHeight: "90vh", width: "16rem" }}>
      <div>
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="bg-primary text-white rounded d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}>
            ☰
          </div>
          <h1 className="h5 fw-bold mb-0">Project Management</h1>
        </div>

        <nav className="d-flex flex-column gap-2">
          {["Dashboard", "Projects", "Tasks", "Users"].map((item) => (
            <button
              key={item}
              onClick={() => setCurrent(item)}
              className={`btn text-start d-flex align-items-center gap-2 ${current === item ? "btn-primary text-white" : "btn-light"}`}
            >
              <span className="bg-secondary rounded" style={{ width: "10px", height: "10px" }}></span>
              <span className="fw-medium">{item}</span>
            </button>
          ))}
        </nav>
      </div>

      <button className="btn btn-link text-muted d-flex align-items-center gap-2">
        <span style={{ fontSize: "1.5rem" }}>⏻</span> Logout
      </button>
    </aside>
  );
}

function Header({ userName }) {
  return (
    <header className="d-flex justify-content-between align-items-center bg-white rounded-top p-3 border-bottom">
      <h2 className="h4 fw-bold mb-0">Welcome, {userName}</h2>
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-primary shadow">New Project</button>
        <div className="d-flex align-items-center gap-2">
          <span className="small">John Doe</span>
          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
            JD
          </div>
        </div>
      </div>
    </header>
  );
}

function ProjectCard({ project }) {
  const statusClass = {
    "To Do": "badge bg-primary",
    "In Progress": "badge bg-success",
    Done: "badge bg-secondary",
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title mb-1">{project.name}</h5>
          <span className={statusClass[project.status] || "badge bg-secondary"}>{project.status}</span>
        </div>
        <span className="text-muted">⋮</span>
      </div>
    </div>
  );
}

function TaskCard({ task, onToggle }) {
  return (
    <div className="card shadow-sm mb-2">
      <div className="card-body d-flex align-items-center gap-2">
        <input type="checkbox" checked={task.checked} onChange={() => onToggle(task.id)} />
        <span className={`small flex-grow-1 ${task.checked ? "text-decoration-line-through text-muted" : ""}`}>
          {task.title}
        </span>
      </div>
    </div>
  );
}

function KanbanBoard({ tasks, setTasks }) {
  const byStatus = STATUS_ORDER.reduce((acc, s) => ({ ...acc, [s]: [] }), {});
  tasks.forEach((t) => (byStatus[t.status] || (byStatus[t.status] = [])).push(t));

  function toggleChecked(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t)));
  }

  function moveTask(id, toStatus) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: toStatus } : t)));
  }

  return (
    <div className="row row-cols-1 row-cols-md-4 g-3">
      {STATUS_ORDER.map((status) => (
        <div key={status} className="col">
          <div className="bg-light rounded p-3" style={{ minHeight: "60vh" }}>
            <h5 className="fw-bold mb-3">{status}</h5>
            {(byStatus[status] || []).map((task) => (
              <div key={task.id}>
                <TaskCard task={task} onToggle={toggleChecked} />
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {STATUS_ORDER.filter((s) => s !== status).map((s) => (
                    <button
                      key={s}
                      onClick={() => moveTask(task.id, s)}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      Move to {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {status === "To Do" && (
              <button className="btn btn-outline-secondary w-100 mt-2">+ Add Task</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [current, setCurrent] = useState("Dashboard");
  const [projects] = useState(projectsSample);
  const [tasks, setTasks] = useState(tasksSample);

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <div className="bg-white rounded shadow overflow-hidden mx-auto" style={{ maxWidth: "1400px" }}>
        <div className="d-flex">
          <div className="p-3">
            <Sidebar current={current} setCurrent={setCurrent} />
          </div>
          <div className="flex-grow-1 p-3">
            <Header userName="John Doe" />
            <main className="p-3">
              <section className="mb-4">
                <h3 className="h5 fw-bold mb-3">Projects</h3>
                <div className="row row-cols-1 row-cols-md-2 g-3">
                  {projects.map((p) => (
                    <div key={p.id} className="col">
                      <ProjectCard project={p} />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="h5 fw-bold">Task Board</h3>
                  <span className="text-muted small">Drag & drop coming later</span>
                </div>
                <KanbanBoard tasks={tasks} setTasks={setTasks} />
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
