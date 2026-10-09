import { useState } from "react";
import { Bookmark } from "lucide-react";

const RECORDS = [
  {
    id: 1,
    title: "Enrollment Schedule - First Semester",
    type: "Announcement",
    college: "College of Computing Studies",
    dept: "Information Technology",
    year: "2025-2026",
    date: "2025-06-10",
  },
  {
    id: 2,
    title: "Nursing Pinning Ceremony",
    type: "Event",
    college: "College of Nursing",
    dept: "Nursing",
    year: "2024-2025",
    date: "2025-05-24",
  },
  {
    id: 3,
    title: "Architecture Design Exhibit",
    type: "Event",
    college: "College of Architecture",
    dept: "Architecture",
    year: "2024-2025",
    date: "2024-11-14",
  },
  {
    id: 4,
    title: "Cybersecurity Awareness Week",
    type: "Announcement",
    college: "College of Computing Studies",
    dept: "Computer Science",
    year: "2024-2025",
    date: "2024-10-07",
  },
  {
    id: 5,
    title: "Final Examination Advisory",
    type: "Announcement",
    college: "College of Nursing",
    dept: "Nursing",
    year: "2023-2024",
    date: "2024-04-18",
  },
];

const unique = (key) => [...new Set(RECORDS.map((r) => r[key]))];
const fmt = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${Number(m)}/${Number(d)}/${y}`;
};

export default function Archives() {
  const [f, setF] = useState({
    year: "",
    college: "",
    dept: "",
    from: "",
    to: "",
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const rows = RECORDS.filter(
    (r) =>
      (!f.year || r.year === f.year) &&
      (!f.college || r.college === f.college) &&
      (!f.dept || r.dept === f.dept) &&
      (!f.from || r.date >= f.from) &&
      (!f.to || r.date <= f.to),
  );

  const exportCsv = () => {
    const head = [
      "Record",
      "Type",
      "College",
      "Department",
      "School Year",
      "Date",
    ];
    const lines = rows.map((r) =>
      [r.title, r.type, r.college, r.dept, r.year, fmt(r.date)]
        .map((v) => `"${v}"`)
        .join(","),
    );
    const blob = new Blob([[head.join(","), ...lines].join("\n")], {
      type: "text/csv",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "archives.csv";
    a.click();
  };

  return (
    <>
      <div className="page-head">
        <div>
          <span className="badge">ADMINISTRATOR WORKSPACE</span>
          <h1>Academic archives</h1>
          <p className="muted">
            Browse historical announcements and events retained from previous
            school years.
          </p>
        </div>
      </div>

      <div className="card filters">
        <label className="field-label">
          SCHOOL YEAR
          <select className="select" value={f.year} onChange={set("year")}>
            <option value="">All school years</option>
            {unique("year").map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label className="field-label">
          COLLEGE
          <select
            className="select"
            value={f.college}
            onChange={set("college")}
          >
            <option value="">All colleges</option>
            {unique("college").map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label className="field-label">
          DEPARTMENT
          <select className="select" value={f.dept} onChange={set("dept")}>
            <option value="">All departments</option>
            {unique("dept").map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label className="field-label">
          FROM DATE
          <input
            type="date"
            className="select"
            value={f.from}
            onChange={set("from")}
          />
        </label>
        <label className="field-label">
          TO DATE
          <input
            type="date"
            className="select"
            value={f.to}
            onChange={set("to")}
          />
        </label>
      </div>

      <div className="card table-card">
        <div className="table-head">
          <div>
            <h3>Archived records</h3>
            <div className="muted small">{rows.length} records found</div>
          </div>
          <button
            className="btn-soft"
            style={{ marginTop: 0 }}
            onClick={exportCsv}
          >
            <Bookmark size={18} /> Export list
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>RECORD</th>
              <th>COLLEGE</th>
              <th>DEPARTMENT</th>
              <th>SCHOOL YEAR</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>
                  <div className="t-title">{r.title}</div>
                  <div className="muted small">{r.type}</div>
                </td>
                <td style={{ fontWeight: 600 }}>{r.college}</td>
                <td className="muted">{r.dept}</td>
                <td>
                  <span className="year-pill">{r.year}</span>
                </td>
                <td className="muted">{fmt(r.date)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="empty">
                  No records match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
