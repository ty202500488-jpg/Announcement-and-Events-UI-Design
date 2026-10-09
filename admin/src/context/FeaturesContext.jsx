import { createContext, useContext, useEffect, useState } from "react";

const FeaturesContext = createContext(null);
const KEY = "wmsu-features";

export function FeaturesProvider({ children }) {
  const [features, setFeatures] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(features));
    } catch {}
  }, [features]);

  const addFeature = (name, description) => {
    const feature = { id: Date.now().toString(), name, description };
    setFeatures((prev) => [...prev, feature]);
    return feature;
  };

  const removeFeature = (id) =>
    setFeatures((prev) => prev.filter((f) => f.id !== id));

  return (
    <FeaturesContext.Provider value={{ features, addFeature, removeFeature }}>
      {children}
    </FeaturesContext.Provider>
  );
}

export const useFeatures = () => useContext(FeaturesContext);
