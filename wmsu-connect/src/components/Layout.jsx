import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Megaphone,
  Search,
  Bell,
  ChevronDown,
  LayoutGrid,
  Users,
  Shield,
  Calendar,
  Eye,
  Settings,
  Sparkles,
  PenLine,
  LogOut,
  Puzzle,
} from "lucide-react";
import ProfileModal from "./ProfileModal.jsx";
import { useFeatures } from "../context/FeaturesContext.jsx";

const NAV = [
  { to: "/", label: "Overview", icon: LayoutGrid, end: true },
  { to: "/users", label: "Manage users", icon: Users },
  { to: "/assign-staff", label: "Assign Staff to Pages", icon: Shield },
  { to: "/pages", label: "Manage Pages", icon: Megaphone },
  { to: "/archives", label: "Archives", icon: Calendar },
  { to: "/reports", label: "Reports / Statistics", icon: Eye },
  { to: "/settings", label: "System Settings", icon: Settings },
];

const NOTIFICATIONS = [
  { id: 1, text: "Enrollment opens today", unread: true },
  { id: 2, text: "University Week registration", unread: true },
  { id: 3, text: "CCS published a new post", unread: false },
];

export default function Layout() {
  const { features } = useFeatures();
  const [menu, setMenu] = useState(null); // "notif" | "user" | null
  const [profileOpen, setProfileOpen] = useState(false);
  const headerRef = useRef(null);

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
        <div className="brand">
          <div className="brand-icon">
            <Megaphone size={24} />
          </div>
          <div>
            <div className="brand-title">WMSU Connect</div>
            <div className="brand-sub">CAMPUS INFORMATION HUB</div>
          </div>
        </div>

        <div className="search">
          <Search size={16} />
          <input placeholder="Search announcements, events, pages..." />
        </div>

        <div className="top-actions">
          <div className="menu-wrap">
            <button
              className="icon-btn"
              onClick={() => setMenu(menu === "notif" ? null : "notif")}
            >
              <Bell size={20} />
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

          <div className="menu-wrap">
            <button
              className="user-btn"
              onClick={() => setMenu(menu === "user" ? null : "user")}
            >
              <span className="avatar">SA</span>
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

      <div className="shell">
        <aside className="sidebar">
          <nav>
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  "nav-item" + (isActive ? " active" : "")
                }
              >
                <Icon size={20} /> {label}
              </NavLink>
            ))}
            {features.map((f) => (
              <NavLink
                key={f.id}
                to={`/feature/${f.id}`}
                className={({ isActive }) =>
                  "nav-item" + (isActive ? " active" : "")
                }
              >
                <Puzzle size={20} /> {f.name}
              </NavLink>
            ))}
          </nav>

          <div className="loop-card">
            <Sparkles size={22} color="#f9a8b4" />
            <h3>Stay in the loop.</h3>
            <p>
              Enable notifications so you never miss an important campus update.
            </p>
            <a href="#prefs">Manage preferences →</a>
          </div>
        </aside>

        <main className="content">
          <Outlet />
        </main>
      </div>

      {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}
    </div>
  );
}
