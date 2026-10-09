import { useState } from "react";
import { Check } from "lucide-react";

export default function ProfileModal({ onClose }) {
  const [form, setForm] = useState({
    fullName: "System Administrator",
    employeeId: "ADMIN-001",
    office: "ICT Office",
    position: "Platform Administrator",
    year: "—",
    phone: "+63 917 555 0123",
    bio: "WMSU Connect authorized account.",
  });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Your profile details</h2>

        <div className="profile-banner">
          <div className="avatar big">SA</div>
          <div>
            <strong>System Administrator</strong>
            <span>admin@wmsu.edu.ph</span>
          </div>
        </div>

        <div className="form-grid">
          <label>
            FULL NAME
            <input value={form.fullName} onChange={set("fullName")} />
          </label>
          <label>
            EMPLOYEE ID
            <input value={form.employeeId} disabled />
          </label>
          <label>
            COLLEGE / OFFICE
            <input value={form.office} onChange={set("office")} />
          </label>
          <label>
            PROGRAM / POSITION
            <input value={form.position} onChange={set("position")} />
          </label>
          <label>
            YEAR LEVEL
            <input value={form.year} onChange={set("year")} />
          </label>
          <label>
            PHONE NUMBER
            <input value={form.phone} onChange={set("phone")} />
          </label>
          <label className="full">
            BIO
            <textarea rows={4} value={form.bio} onChange={set("bio")} />
          </label>
        </div>

        <div className="modal-actions">
          <button className="btn-text" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={onClose}>
            <Check size={16} /> Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
