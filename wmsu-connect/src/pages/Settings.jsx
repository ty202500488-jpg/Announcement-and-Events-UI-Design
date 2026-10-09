import { useState } from "react";
import { Shield, Calendar } from "lucide-react";

const RETENTION = [
  ["Archive retention", "Permanent"],
  ["Automatic backup", "Daily"],
  ["Archive format", "Read-only"],
  ["Last backup", "Today, 3:00 AM"],
];

export default function Settings() {
  const [startYear, setStartYear] = useState(2025);

  const rollOver = () => {
    const next = `${startYear + 1}–${startYear + 2}`;
    if (
      window.confirm(
        `Archive all current records and start school year ${next}?`,
      )
    ) {
      setStartYear(startYear + 1);
    }
  };

  return (
    <>
      <div className="page-head">
        <div>
          <span className="badge">ADMINISTRATOR WORKSPACE</span>
          <h1>System settings</h1>
          <p className="muted">
            Configure the active school year, annual refresh, retention, and
            platform preferences.
          </p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="card settings-card">
          <div className="settings-top">
            <div>
              <h3>Academic year lifecycle</h3>
              <p className="muted" style={{ marginTop: 6, lineHeight: 1.5 }}>
                The active workspace refreshes at the start of each school year.
              </p>
            </div>
            <span className="status published">ACTIVE</span>
          </div>

          <div className="year-box">
            <div className="year-label">CURRENT SCHOOL YEAR</div>
            <div className="year-value">
              {startYear}–{startYear + 1}
            </div>
          </div>

          <div className="warn-box">
            <Shield size={22} />
            <div>
              <b>Annual refresh archives current records</b>
              <p>
                All announcements, events, statistics, page activity, and
                registrations are preserved and remain searchable by college,
                department, and date.
              </p>
            </div>
          </div>

          <button className="btn-primary lg" onClick={rollOver}>
            <Calendar size={18} /> Archive &amp; start next school year
          </button>
        </div>

        <div className="card settings-card">
          <h3>Data retention</h3>
          <div style={{ marginTop: 18 }}>
            {RETENTION.map(([k, v]) => (
              <div className="ret-row" key={k}>
                <span className="muted">{k}</span>
                <b>{v}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
