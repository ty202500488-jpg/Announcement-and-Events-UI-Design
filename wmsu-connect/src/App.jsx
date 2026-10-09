import { Routes, Route } from "react-router-dom";
import { FeaturesProvider } from "./context/FeaturesContext.jsx";
import Layout from "./components/Layout.jsx";
import Overview from "./pages/Overview.jsx";
import Users from "./pages/Users.jsx";
import AssignStaff from "./pages/AssignStaff.jsx";
import ManagePages from "./pages/ManagePages.jsx";
import Archives from "./pages/Archives.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";
import CustomFeature from "./pages/CustomFeature.jsx";

export default function App() {
  return (
    <FeaturesProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/users" element={<Users />} />
          <Route path="/assign-staff" element={<AssignStaff />} />
          <Route path="/pages" element={<ManagePages />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/feature/:id" element={<CustomFeature />} />
        </Route>
      </Routes>
    </FeaturesProvider>
  );
}
