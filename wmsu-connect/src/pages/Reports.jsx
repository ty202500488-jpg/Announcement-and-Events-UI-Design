import { useState } from "react";
import { Users, Eye, Heart, Calendar } from "lucide-react";

const PERIODS = {
  "This school year": 1,
  "Last school year": 0.86,
  "Last 30 days": 0.12,
};

const COLLEGES = {
  "All colleges": {
    share: 1,
    bars: [38, 52, 46, 70, 60, 84, 72, 96, 66, 80, 94, 88],
  },
  "College of Computing Studies": {
    share: 0.38,
    bars: [50, 62, 58, 74, 66, 88, 80, 98, 72, 84, 96, 90],
  },
  "College of Nursing": {
    share: 0.33,
    bars: [34, 48, 44, 60, 58, 70, 66, 82, 64, 76, 80, 78],
  },
  "College of Architecture": {
    share: 0.29,
    bars: [26, 40, 36, 52, 46, 62, 56, 70, 50, 64, 72, 68],
  },
};

const TOP_PAGES = [
  {
    name: "Computing Studies",
    college: "College of Computing Studies",
    views: 8942,
  },
  { name: "College of Nursing", college: "College of Nursing", views: 7610 },
  { name: "Architecture", college: "College of Architecture", views: 5284 },
];

const BASE = [
  { icon: Users, label: "Active users", value: 12842, delta: "+9.7%" },
  { icon: Eye, label: "Post views", value: 48206, delta: "+12.4%" },
  { icon: Heart, label: "Engagements", value: 10892, delta: "+8.1%" },
  { icon: Calendar, label: "Event registrations", value: 1846, delta: "+6.8%" },
];

export default function Reports() {
  const [period, setPeriod] = useState("This school year");
  const [college, setCollege] = useState("All colleges");

  const factor = PERIODS[period] * COLLEGES[college].share;
  const bars = COLLEGES[college].bars;
  const pages = TOP_PAGES.filter(
    (p) => college === "All colleges" || p.college === college,
  );
  const maxViews = Math.max(...TOP_PAGES.map((p) => p.views));

  const download = () => {
    const csv =
      "Month,Engagement\n" + bars.map((b, i) => `${i + 1},${b}`).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "engagement-report.csv";
    a.click();
  };

  return (
    <>
      <div className="page-head">
        <div>
          <span className="badge">ADMINISTRATOR WORKSPACE</span>
          <h1>Reports &amp; statistics</h1>
          <p className="muted" style={{ maxWidth: 460 }}>
            Monitor platform reach, engagement, registrations, and publishing
            activity.
          </p>
        </div>
        <div className="filters-inline">
          <label className="field-label">
            PERIOD
            <select
              className="select"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              {Object.keys(PERIODS).map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <label className="field-label">
            COLLEGE
            <select
              className="select"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            >
              {Object.keys(COLLEGES).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="stats">
        {BASE.map(({ icon: Icon, label, value, delta }) => (
          <div className="card stat" key={label}>
            <div className="stat-top">
              <div className="stat-icon">
                <Icon size={20} />
              </div>
              <span className="delta">{delta}</span>
            </div>
            <div className="stat-value">
              {Math.round(value * factor).toLocaleString()}
            </div>
            <div className="muted">{label}</div>
          </div>
        ))}
      </div>

      <div className="row-2">
        <div className="engage">
          <div className="engage-top">
            <div>
              <div className="engage-label">Monthly engagement</div>
              <div className="engage-value">{college}</div>
            </div>
            <button className="link-btn" onClick={download}>
              Download report
            </button>
          </div>
          <div className="bars">
            {bars.map((h, i) => (
              <div className="bar-wrap" key={i}>
                <div
                  className="bar"
                  style={{ height: h * 1.5 + "px", flex: "none" }}
                />
                <span className="bar-label">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card health">
          <h3>Top performing pages</h3>
          {pages.map((p, i) => (
            <div className="top-item" key={p.name}>
              <div className="top-row">
                <b>
                  {i + 1}. {p.name}
                </b>
                <span>{p.views.toLocaleString()} views</span>
              </div>
              <div className="progress">
                <div style={{ width: (p.views / maxViews) * 92 + "%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
