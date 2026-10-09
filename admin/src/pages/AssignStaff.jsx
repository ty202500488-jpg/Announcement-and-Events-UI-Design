import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, Search, ChevronDown, Check } from "lucide-react";

// All users of the system that can be assigned (you can add more here)
const USERS = [
  {
    id: 1,
    initials: "AR",
    name: "Prof. Ana Reyes",
    email: "ana.reyes@wmsu.edu.ph",
    role: "Staff",
  },
  {
    id: 2,
    initials: "JL",
    name: "Dr. Jose Lim",
    email: "jose.lim@wmsu.edu.ph",
    role: "Staff",
  },
  {
    id: 3,
    initials: "MD",
    name: "Maria Dela Cruz",
    email: "student@wmsu.edu.ph",
    role: "Student",
  },
  {
    id: 4,
    initials: "CS",
    name: "Prof. Carlos Santos",
    email: "carlos.santos@wmsu.edu.ph",
    role: "Staff",
  },
  {
    id: 5,
    initials: "LG",
    name: "Dr. Liza Garcia",
    email: "liza.garcia@wmsu.edu.ph",
    role: "Staff",
  },
  {
    id: 6,
    initials: "SA",
    name: "System Administrator",
    email: "admin@wmsu.edu.ph",
    role: "Administrator",
  },
];
const PAGES = [
  "College of Computing Studies",
  "College of Nursing",
  "College of Architecture",
];

export default function AssignStaff() {
  const [assignments, setAssignments] = useState([
    { id: 1, userId: 1, page: "College of Computing Studies" },
    { id: 2, userId: 2, page: "College of Nursing" },
  ]);
  const [selected, setSelected] = useState(null); // user id
  const [page, setPage] = useState(PAGES[0]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const pickerRef = useRef(null);

  // close the picker when clicking outside
  useEffect(() => {
    const close = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const selectedUser = USERS.find((u) => u.id === selected);
  const results = USERS.filter((u) =>
    (u.name + " " + u.email + " " + u.role)
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  const choose = (id) => {
    setSelected(id);
    setOpen(false);
    setQuery("");
    setMessage("");
  };

  const assign = () => {
    if (!selected) {
      setMessage("Please select a staff member first.");
      return;
    }
    const exists = assignments.some(
      (a) => a.userId === selected && a.page === page,
    );
    if (exists) {
      setMessage("That user is already assigned to this page.");
      return;
    }
    setAssignments([
      ...assignments,
      { id: Date.now(), userId: selected, page },
    ]);
    setSelected(null);
    setMessage("");
  };

  return (
    <>
      <div className="page-head">
        <div>
          <span className="badge">ADMINISTRATOR WORKSPACE</span>
          <h1>Assign staff to pages</h1>
          <p className="muted">
            Control which authorized staff members can publish and manage each
            official page.
          </p>
        </div>
      </div>

      <div className="card assign-card">
        <div className="field-label">
          STAFF MEMBER
          <div className="picker" ref={pickerRef}>
            <button
              type="button"
              className="select picker-btn"
              onClick={() => setOpen(!open)}
            >
              {selectedUser ? (
                <span className="picker-value">
                  <span className="avatar xs">{selectedUser.initials}</span>
                  {selectedUser.name}
                </span>
              ) : (
                <span className="picker-placeholder">
                  Search or select a user
                </span>
              )}
              <ChevronDown size={18} />
            </button>

            {open && (
              <div className="picker-menu">
                <div className="picker-search">
                  <Search size={16} />
                  <input
                    autoFocus
                    placeholder="Search by name, email or role..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="picker-list">
                  {results.map((u) => (
                    <button
                      type="button"
                      key={u.id}
                      className="picker-item"
                      onClick={() => choose(u.id)}
                    >
                      <span className="avatar xs">{u.initials}</span>
                      <span className="grow">
                        <span className="picker-name">{u.name}</span>
                        <span className="picker-email">{u.email}</span>
                      </span>
                      <span className="role-chip">{u.role}</span>
                      {selected === u.id && <Check size={16} color="#a50d34" />}
                    </button>
                  ))}
                  {results.length === 0 && (
                    <div className="picker-empty">No users found.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <label className="field-label">
          OFFICIAL PAGE
          <select
            className="select"
            value={page}
            onChange={(e) => setPage(e.target.value)}
          >
            {PAGES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>

        <button className="btn-primary lg" onClick={assign}>
          <Plus size={18} /> Assign
        </button>
      </div>

      {message && <div className="assign-msg">{message}</div>}

      <div className="card">
        <div className="card-title">
          Current assignments
          <small>{assignments.length} active page permissions</small>
        </div>
        {assignments.map((a) => {
          const u = USERS.find((x) => x.id === a.userId);
          return (
            <div className="list-row" key={a.id}>
              <div className="avatar sm">{u.initials}</div>
              <div className="grow">
                <div className="list-name">{u.name}</div>
                <div className="list-email">{u.email}</div>
              </div>
              <span className="tag">{a.page}</span>
              <button
                className="ghost"
                onClick={() =>
                  setAssignments(assignments.filter((x) => x.id !== a.id))
                }
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
        {assignments.length === 0 && (
          <div className="empty">No assignments yet.</div>
        )}
      </div>
    </>
  );
}
