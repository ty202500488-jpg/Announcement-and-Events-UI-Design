import { useNavigate, useParams } from "react-router-dom";
import { Puzzle, Trash2 } from "lucide-react";
import { useFeatures } from "../context/FeaturesContext.jsx";

export default function CustomFeature() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { features, removeFeature } = useFeatures();
  const feature = features.find((f) => f.id === id);

  if (!feature) {
    return (
      <div className="page-head">
        <div>
          <span className="badge">WORKSPACE EXTENSION</span>
          <h1>Feature not found</h1>
          <p className="muted">This feature may have been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-head">
        <div>
          <span className="badge">WORKSPACE EXTENSION</span>
          <h1>{feature.name}</h1>
          <p className="muted">
            {feature.description || "No description provided."}
          </p>
        </div>
        <button
          className="btn-soft"
          onClick={() => {
            removeFeature(feature.id);
            navigate("/");
          }}
        >
          <Trash2 size={18} /> Remove feature
        </button>
      </div>

      <div className="card feature-empty">
        <div className="stat-icon">
          <Puzzle size={22} />
        </div>
        <h3>Module workspace</h3>
        <p className="muted">
          This custom module is ready. Build its content here.
        </p>
      </div>
    </>
  );
}
