import { useState } from "react";

const INITIAL = [
  {
    id: 1,
    initials: "MD",
    name: "Maria Dela Cruz",
    email: "student@wmsu.edu.ph",
    role: "Student",
    active: true,
  },
  {
    id: 2,
    initials: "PA",
    name: "Prof. Ana Reyes",
    email: "staff@wmsu.edu.ph",
    role: "Staff",
    active: true,
  },
  {
    id: 3,
    initials: "SA",
    name: "System Administrator",
    email: "admin@wmsu.edu.ph",
    role: "Administrator",
    active: true,
  },
];

export default function Users() {
  const [users, setUsers] = useState(INITIAL);
  const update = (id, patch) =>
    setUsers(users.map((u) => (u.id === id ? { ...u, ...patch } : u)));

  return (
    <>
      <div className="page-head">
        <div>
          <span className="badge">ADMINISTRATOR WORKSPACE</span>
          <h1>Manage users</h1>
          <p className="muted">
            Manage platform access, account roles, and status.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Active accounts</div>
        {users.map((u) => (
          <div className="list-row" key={u.id}>
            <div className="avatar sm">{u.initials}</div>
            <div className="grow">
              <div className="list-name">{u.name}</div>
              <div className="list-email">{u.email}</div>
            </div>
            <select
              className="select"
              value={u.role}
              onChange={(e) => update(u.id, { role: e.target.value })}
            >
              <option>Student</option>
              <option>Staff</option>
              <option>Administrator</option>
            </select>
            <button
              className={"pill-toggle " + (u.active ? "on" : "off")}
              onClick={() => update(u.id, { active: !u.active })}
            >
              {u.active ? "Active" : "Inactive"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
