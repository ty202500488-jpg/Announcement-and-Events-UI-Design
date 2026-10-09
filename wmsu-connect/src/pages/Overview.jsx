import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Megaphone,
  Calendar,
  Users,
  Plus,
  Search,
  ChevronDown,
  PenLine,
  Trash2,
} from "lucide-react";
import AddFeatureModal from "../components/AddFeatureModal.jsx";
import { useFeatures } from "../context/FeaturesContext.jsx";

const STATS = [
  { icon: Eye, value: "28.4k", label: "Total reach", delta: "+12.4%" },
  { icon: Megaphone, value: "148", label: "Published posts", delta: "+8.1%" },
  { icon: Calendar, value: "19", label: "Upcoming events", delta: "+4.3%" },
  { icon: Users, value: "12.8k", label: "Active users", delta: "+9.7%" },
];

const BARS = [38, 58, 46, 78, 62, 90, 74, 100, 70, 85, 98, 92];

const INITIAL = [
  {
    id: 1,
    title: "Enrollment schedule for 2nd Semester",
    type: "Announcement",
    status: "published",
    date: "Jan 13, 2026",
    views: "2,483",
  },
  {
    id: 2,
    title: "WMSU University Week 2026",
    type: "Event",
    status: "published",
    date: "Jan 12, 2026",
    views: "4,129",
  },
  {
    id: 3,
    title: "Research Colloquium: Call for Papers",
    type: "Event",
    status: "scheduled",
    date: "Jan 18, 2026",
    views: "—",
  },
  {
    id: 4,
    title: "Updated campus parking guidelines",
    type: "Announcement",
    status: "draft",
    date: "Jan 10, 2026",
    views: "—",
  },
];

export default function Overview() {
  const [rows, setRows] = useState(INITIAL);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [showSearch, setShowSearch] = useState(false);
  const [featureOpen, setFeatureOpen] = useState(false);
  const navigate = useNavigate();
  const { addFeature } = useFeatures();

  const handleAddFeature = (name, description) => {
    const f = addFeature(name, description);
    setFeatureOpen(false);
    navigate(`/feature/${f.id}`);
  };

  const filtered = rows.filter(
    (r) =>
      (status === "all" || r.status === status) &&
      r.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <div className="page-head">
        <div>
          <span className="badge">ADMINISTRATOR WORKSPACE</span>
          <h1>Campus overview</h1>
          <p className="muted">Manage the entire WMSU Connect platform.</p>
        </div>
        <button className="btn-soft" onClick={() => setFeatureOpen(true)}>
          <Plus size={18} /> Add feature
        </button>
      </div>

      <div className="stats">
        {STATS.map(({ icon: Icon, value, label, delta }) => (
          <div className="card stat" key={label}>
            <div className="stat-top">
              <div className="stat-icon">
                <Icon size={20} />
              </div>
              <span className="delta">{delta}</span>
            </div>
            <div className="stat-value">{value}</div>
            <div className="muted">{label}</div>
          </div>
        ))}
      </div>

      <div className="row-2">
        <div className="engage">
          <div className="engage-top">
            <div>
              <div className="engage-label">Platform engagement</div>
              <div className="engage-value">42,806 interactions</div>
            </div>
            <span className="pill-cream">LAST 30 DAYS</span>
          </div>
          <div className="bars">
            {BARS.map((h, i) => (
              <div key={i} className="bar" style={{ height: h + "%" }} />
            ))}
          </div>
        </div>

        <div className="card health">
          <h3>System health</h3>
          <div className="health-row">
            <span>API services</span>
            <b className="ok">Operational</b>
          </div>
          <div className="health-row">
            <span>Email delivery</span>
            <b className="ok">Operational</b>
          </div>
          <div className="health-row">
            <span>Content moderation</span>
            <b className="warn">3 pending</b>
          </div>
        </div>
      </div>

      <div className="card table-card">
        <div className="table-head">
          <div>
            <h3>Recent content</h3>
            <div className="muted small">
              Manage announcements and campus events
            </div>
          </div>
          <div className="table-tools">
            {showSearch ? (
              <input
                className="mini-input"
                autoFocus
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => !query && setShowSearch(false)}
              />
            ) : (
              <button
                className="btn-outline"
                onClick={() => setShowSearch(true)}
              >
                <Search size={16} /> Search
              </button>
            )}
            <div className="select-wrap">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="all">All status</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="draft">Draft</option>
              </select>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>TITLE</th>
              <th>TYPE</th>
              <th>STATUS</th>
              <th>PUBLISHED</th>
              <th>VIEWS</th>
              <th className="right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td className="t-title">{r.title}</td>
                <td className="muted">{r.type}</td>
                <td>
                  <span className={"status " + r.status}>
                    {r.status.toUpperCase()}
                  </span>
                </td>
                <td className="muted date">{r.date}</td>
                <td className="views">{r.views}</td>
                <td className="right actions">
                  <button className="ghost">
                    <PenLine size={16} />
                  </button>
                  <button
                    className="ghost"
                    onClick={() => setRows(rows.filter((x) => x.id !== r.id))}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="empty">
                  No content found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {featureOpen && (
        <AddFeatureModal
          onClose={() => setFeatureOpen(false)}
          onSubmit={handleAddFeature}
        />
      )}
    </>
  );
}
