import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext(null);
const KEY = "wmsu-data-v2";

export const usernameOf = (email) => email.split("@")[0];

const initialsOf = (name) =>
  name
    .replace(/^(Prof|Dr|Engr|Atty|Ms|Mr|Mrs)\.?\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

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

const INITIAL_USERS = [
  {
    id: "u1",
    initials: "MD",
    name: "Maria Dela Cruz",
    email: "student@wmsu.edu.ph",
    role: "Student",
    active: true,
    managedPages: [],
  },
  {
    id: "u2",
    initials: "PA",
    name: "Prof. Ana Reyes",
    email: "staff@wmsu.edu.ph",
    role: "Staff",
    active: true,
    managedPages: ["College of Computing Studies"],
  },
  {
    id: "u3",
    initials: "JL",
    name: "Dr. Jose Lim",
    email: "jose.lim@wmsu.edu.ph",
    role: "Staff",
    active: true,
    managedPages: ["College of Nursing"],
  },
  {
    id: "u4",
    initials: "SA",
    name: "System Administrator",
    email: "admin@wmsu.edu.ph",
    role: "Administrator",
    active: true,
    managedPages: [],
  },
  {
    id: "u5",
    initials: "JD",
    name: "Juan Dela Pena",
    email: "juan.delapena@wmsu.edu.ph",
    role: "Student",
    active: true,
    managedPages: [],
  },
  {
    id: "u6",
    initials: "SR",
    name: "Sofia Ramirez",
    email: "sofia.ramirez@wmsu.edu.ph",
    role: "Student",
    active: true,
    managedPages: [],
  },
  {
    id: "u7",
    initials: "KN",
    name: "Kyle Navarro",
    email: "kyle.navarro@wmsu.edu.ph",
    role: "Student",
    active: true,
    managedPages: [],
  },
  {
    id: "u8",
    initials: "BT",
    name: "Bianca Torres",
    email: "bianca.torres@wmsu.edu.ph",
    role: "Student",
    active: true,
    managedPages: [],
  },
];

const INITIAL_PAGES = [
  {
    id: "p1",
    code: "CoC",
    name: "College of Computing Studies",
    dept: "Information Technology",
    followers: 5826,
    active: true,
  },
  {
    id: "p2",
    code: "CoN",
    name: "College of Nursing",
    dept: "Nursing",
    followers: 4612,
    active: true,
  },
  {
    id: "p3",
    code: "CoA",
    name: "College of Architecture",
    dept: "Architecture",
    followers: 3241,
    active: true,
  },
];

const INITIAL_REQUESTS = [
  {
    id: "r1",
    name: "College of Engineering Page",
    office: "College of Engineering",
    unit: "Dean's Office",
    requestedOn: "Jan 14, 2026",
    requester: { name: "Engr. Mia Santos", email: "mia.santos@wmsu.edu.ph" },
  },
  {
    id: "r2",
    name: "College of Law Student Affairs",
    office: "College of Law",
    unit: "Student Affairs",
    requestedOn: "Jan 13, 2026",
    requester: { name: "Atty. Paolo Cruz", email: "paolo.cruz@wmsu.edu.ph" },
  },
  {
    id: "r3",
    name: "University Library",
    office: "Academic Affairs",
    unit: "Library Services",
    requestedOn: "Jan 11, 2026",
    requester: { name: "Ms. Carla Dizon", email: "carla.dizon@wmsu.edu.ph" },
  },
];

const load = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && saved.users && saved.pages && saved.requests) return saved;
  } catch {}
  return {
    users: INITIAL_USERS,
    pages: INITIAL_PAGES,
    requests: INITIAL_REQUESTS,
  };
};

export function DataProvider({ children }) {
  const [state, setState] = useState(load);
  const { users, pages, requests } = state;

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const updateUser = (id, patch) =>
    setState((s) => ({
      ...s,
      users: s.users.map((u) => (u.id === id ? { ...u, ...patch } : u)),
    }));

  const replaceManager = (pageName, oldId, newId) =>
    setState((s) => ({
      ...s,
      users: s.users.map((u) => {
        if (u.id === oldId) {
          return {
            ...u,
            managedPages: u.managedPages.filter((n) => n !== pageName),
          };
        }
        if (u.id === newId) {
          return {
            ...u,
            role: u.role === "Student" ? "Staff" : u.role,
            managedPages: u.managedPages.includes(pageName)
              ? u.managedPages
              : [...u.managedPages, pageName],
          };
        }
        return u;
      }),
    }));

  const addPage = (name) =>
    setState((s) => ({
      ...s,
      pages: [
        ...s.pages,
        {
          id: "p" + Date.now(),
          code: makeCode(name),
          name,
          dept: "Official page",
          followers: 0,
          active: true,
        },
      ],
    }));

  const removePage = (id) =>
    setState((s) => ({ ...s, pages: s.pages.filter((p) => p.id !== id) }));

  const togglePage = (id) =>
    setState((s) => ({
      ...s,
      pages: s.pages.map((p) =>
        p.id === id ? { ...p, active: !p.active } : p,
      ),
    }));

  const approveRequest = (id) =>
    setState((s) => {
      const req = s.requests.find((r) => r.id === id);
      if (!req) return s;

      const newPage = {
        id: "p" + Date.now(),
        code: makeCode(req.name),
        name: req.name,
        dept: req.unit,
        followers: 0,
        active: true,
      };

      const existing = s.users.find(
        (u) => u.email.toLowerCase() === req.requester.email.toLowerCase(),
      );
      const newUsers = existing
        ? s.users.map((u) =>
            u.id === existing.id
              ? {
                  ...u,
                  role: u.role === "Student" ? "Staff" : u.role,
                  managedPages: [...u.managedPages, req.name],
                }
              : u,
          )
        : [
            ...s.users,
            {
              id: "u" + Date.now(),
              initials: initialsOf(req.requester.name),
              name: req.requester.name,
              email: req.requester.email,
              role: "Staff",
              active: true,
              managedPages: [req.name],
            },
          ];

      return {
        users: newUsers,
        pages: [...s.pages, newPage],
        requests: s.requests.filter((r) => r.id !== id),
      };
    });

  const rejectRequest = (id) =>
    setState((s) => ({
      ...s,
      requests: s.requests.filter((r) => r.id !== id),
    }));

  return (
    <DataContext.Provider
      value={{
        users,
        pages,
        requests,
        updateUser,
        replaceManager,
        addPage,
        removePage,
        togglePage,
        approveRequest,
        rejectRequest,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
