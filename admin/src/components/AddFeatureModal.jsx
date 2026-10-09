import { useState } from "react";
import { X, Plus } from "lucide-react";

export default function AddFeatureModal({ onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name.trim(), description.trim());
  };

  return (
    <div className="overlay blur" onClick={onClose}>
      <form
        className="modal feature-modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="feature-head">
          <div>
            <span className="badge">WORKSPACE EXTENSION</span>
            <h2>Add a new feature</h2>
            <p className="muted">
              Create a custom module for the administration workspace.
            </p>
          </div>
          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <label className="field-label">
          FEATURE NAME
          <input
            className="text-input"
            required
            autoFocus
            placeholder="Example: Campus feedback tracker"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="field-label">
          DESCRIPTION
          <textarea
            className="text-input"
            rows={5}
            placeholder="Describe what this feature should do..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="modal-actions">
          <button type="button" className="btn-text" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary lg">
            <Plus size={18} /> Add feature
          </button>
        </div>
      </form>
    </div>
  );
}
