import { useEffect, useRef, useState } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import {
  Search,
  Bell,
  ChevronDown,
  LayoutGrid,
  Users,
  Shield,
  Megaphone,
  Calendar,
  Eye,
  Settings,
  PenLine,
  LogOut,
  Puzzle,
  SlidersHorizontal,
  GraduationCap,
  Building2,
  Monitor,
} from "lucide-react";
import ProfileModal from "./ProfileModal.jsx";
import { useFeatures } from "../context/FeaturesContext.jsx";
import { useData } from "../context/DataContext.jsx";

const MAIN = [
  { to: "/", label: "Overview", icon: LayoutGrid, end: true },
  { to: "/users", label: "Manage users", icon: Users },
  { to: "/page-requests", label: "Pages", icon: Shield },
  { to: "/pages", label: "Manage Pages", icon: Megaphone },
];

const INSIGHTS = [
  { to: "/archives", label: "Archives", icon: Calendar },
  { to: "/reports", label: "Reports / Statistics", icon: Eye },
];

const NOTIFICATIONS = [
  { id: 1, text: "Enrollment opens today", unread: true },
  { id: 2, text: "University Week registration", unread: true },
  { id: 3, text: "CCS published a new post", unread: false },
];

function NavItem({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
    >
      <Icon size={20} /> {label}
    </NavLink>
  );
}

function DepartmentsRail() {
  const { pages } = useData();
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? pages : pages.slice(0, 6);

  return (
    <aside className="rail">
      <div className="rail-head">
        <h3>Departments</h3>
        <Link to="/pages">View All</Link>
      </div>

      <Link to="/pages" className="dept gold">
        <span className="dept-icon">
          <GraduationCap size={20} />
        </span>
        <span>
          <b>Western Mindanao State University</b>
          <span className="sub">General updates &amp; notices</span>
        </span>
      </Link>

      {list.map((p, i) => (
        <Link
          to="/pages"
          key={p.id}
          className={"dept" + (i === 0 ? " rose" : "")}
        >
          <span className="dept-icon">
            {i === 0 ? <Monitor size={20} /> : <Building2 size={20} />}
          </span>
          <span>
            <b>{p.name}</b>
            <span className="sub">{p.dept}</span>
          </span>
        </Link>
      ))}

      {pages.length === 0 && <div className="empty">No pages yet.</div>}

      {pages.length > 6 && (
        <button className="see-more" onClick={() => setShowAll(!showAll)}>
          {showAll ? "See Less" : "See More"}
          <ChevronDown
            size={16}
            style={{ transform: showAll ? "rotate(180deg)" : "none" }}
          />
        </button>
      )}
    </aside>
  );
}

export default function Layout() {
  const { features } = useFeatures();
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(null); // "notif" | "user" | null
  const [profileOpen, setProfileOpen] = useState(false);
  const headerRef = useRef(null);
  const hasRail = pathname === "/";

  useEffect(() => {
    const close = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target))
        setMenu(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="app">
      <header className="topbar" ref={headerRef}>
        <Link to="/" className="brand">
          <span className="wordmark">CRIMSON</span>
        </Link>

        <div className="search">
          <Search size={18} />
          <input placeholder="Search announcements, events, departments..." />
          <SlidersHorizontal size={18} />
        </div>

        <div className="top-actions">
          <div className="menu-wrap">
            <button
              className="icon-btn"
              onClick={() => setMenu(menu === "notif" ? null : "notif")}
              aria-label="Notifications"
            >
              <Bell size={22} />
              <span className="dot" />
            </button>
            {menu === "notif" && (
              <div className="dropdown notif">
                <h4>Notifications</h4>
                {NOTIFICATIONS.map((n) => (
                  <div className="notif-item" key={n.id}>
                    <span className={"bullet" + (n.unread ? " unread" : "")} />
                    {n.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          <span className="vdivider" />

          <div className="menu-wrap">
            <button
              className="user-btn"
              onClick={() => setMenu(menu === "user" ? null : "user")}
            >
              <span className="avatar-wrap">
                <span className="avatar">SA</span>
                <span className="status-dot" />
              </span>
              <span className="user-text">
                <b>System Administrator</b>
                <span>MISTO Office</span>
              </span>
              <ChevronDown size={18} />
            </button>
            {menu === "user" && (
              <div className="dropdown user">
                <div className="user-head">
                  <strong>System Administrator</strong>
                  <span>admin@wmsu.edu.ph</span>
                </div>
                <button
                  className="dd-item"
                  onClick={() => {
                    setProfileOpen(true);
                    setMenu(null);
                  }}
                >
                  <PenLine size={18} /> Account details
                </button>
                <button className="dd-item" onClick={() => alert("Signed out")}>
                  <LogOut size={18} /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className={"shell" + (hasRail ? " has-rail" : "")}>
        <aside className="sidebar">
          <button className="side-profile" onClick={() => setProfileOpen(true)}>
            <span className="avatar">SA</span>
            <b>System Administrator</b>
          </button>

          <nav>
            <div className="nav-label">Main</div>
            {MAIN.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}

            <div className="nav-label">Insights</div>
            {INSIGHTS.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}

            {features.length > 0 && (
              <>
                <div className="nav-label">Extensions</div>
                {features.map((f) => (
                  <NavItem
                    key={f.id}
                    to={`/feature/${f.id}`}
                    label={f.name}
                    icon={Puzzle}
                  />
                ))}
              </>
            )}

            <div className="nav-label">System</div>
            <NavItem to="/settings" label="System Settings" icon={Settings} />
            <button
              className="nav-item logout"
              onClick={() => alert("Signed out")}
            >
              <LogOut size={20} /> Logout
            </button>
          </nav>
        </aside>

        <main className="content">
          <Outlet />
        </main>

        {hasRail && <DepartmentsRail />}
      </div>

      {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}
    </div>
  );
}
