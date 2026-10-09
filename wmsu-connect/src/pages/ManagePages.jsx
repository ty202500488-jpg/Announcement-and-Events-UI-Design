import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const INITIAL = [
  {
    id: 1,
    code: "CoC",
    name: "College of Computing Studies",
    dept: "Information Technology",
    followers: 5826,
    active: true,
  },
  {
    id: 2,
    code: "CoN",
    name: "College of Nursing",
    dept: "Nursing",
    followers: 4612,
    active: true,
  },
  {
    id: 3,
    code: "CoA",
    name: "College of Architecture",
    dept: "Architecture",
    followers: 3241,
    active: true,
  },
];

const makeCode = (name) => {
  if (name.toLowerCase().startsWith("college of ")) {
    return "Co" + name.slice(11).trim().charAt(0).toUpperCase();
  }
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join("");
};

export default function ManagePages() {
  const [pages, setPages] = useState(INITIAL);
  const [name, setName] = useState("");

  const add = () => {
    const n = name.trim();
    if (!n) return;
    setPages([
      ...pages,
      {
        id: Date.now(),
        code: makeCode(n),
        name: n,
        dept: "Official page",
        followers: 0,
        active: true,
      },
    ]);
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
        {pages.map((p) => (
          <div className="card page-card" key={p.id}>
            <div className="page-top">
              <div className="page-code">{p.code}</div>
              <div className="grow">
                <div className="list-name">{p.name}</div>
                <div className="list-email">
                  {p.dept} · {p.followers.toLocaleString()} followers
                </div>
              </div>
              <button
                className="ghost"
                onClick={() => setPages(pages.filter((x) => x.id !== p.id))}
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="page-bottom">
              <span>{p.name}</span>
              <button
                className={"pill-toggle " + (p.active ? "on" : "off")}
                onClick={() =>
                  setPages(
                    pages.map((x) =>
                      x.id === p.id ? { ...x, active: !x.active } : x,
                    ),
                  )
                }
              >
                {p.active ? "Active" : "Inactive"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
