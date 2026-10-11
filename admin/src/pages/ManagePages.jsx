import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useData } from "../context/DataContext.jsx";

export default function ManagePages() {
  const { pages, users, addPage, removePage, togglePage } = useData();
  const [name, setName] = useState("");

  const add = () => {
    const n = name.trim();
    if (!n) return;
    addPage(n);
    setName("");
  };

  return (
    <>
      <div className="page-head">
        <div>
          <span className="badge">ADMINISTRATOR WORKSPACE</span>
          <h1>Manage pages</h1>
          <p className="muted" style={{ maxWidth: 560 }}>
            Create, update, activate, and organize official college and
            department pages.
          </p>
        </div>
        <div className="add-page">
          <input
            placeholder="New page name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
          />
          <button className="btn-primary lg" onClick={add}>
            <Plus size={18} /> Add page
          </button>
        </div>
      </div>

      <div className="page-grid">
        {pages.map((p) => {
          const managers = users
            .filter((u) => u.managedPages.includes(p.name))
            .map((u) => u.name);
          return (
            <div className="card page-card" key={p.id}>
              <div className="page-top">
                <div className="page-code">{p.code}</div>
                <div className="grow">
                  <div className="list-name">{p.name}</div>
                  <div className="list-email">
                    {p.dept} · {p.followers.toLocaleString()} followers
                  </div>
                </div>
                <button className="ghost" onClick={() => removePage(p.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="page-bottom">
                <span>
                  {managers.length
                    ? "Managed by " + managers.join(", ")
                    : p.name}
                </span>
                <button
                  className={"pill-toggle " + (p.active ? "on" : "off")}
                  onClick={() => togglePage(p.id)}
                >
                  {p.active ? "Active" : "Inactive"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
