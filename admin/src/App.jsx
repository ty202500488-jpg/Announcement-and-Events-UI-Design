import { Routes, Route } from "react-router-dom";
import { FeaturesProvider } from "./context/FeaturesContext.jsx";
import { DataProvider } from "./context/DataContext.jsx";
import Layout from "./components/Layout.jsx";
import Overview from "./pages/Overview.jsx";
import Users from "./pages/Users.jsx";
import PageRequests from "./pages/PageRequests.jsx";
import ManagePages from "./pages/ManagePages.jsx";
import Archives from "./pages/Archives.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";
import CustomFeature from "./pages/CustomFeature.jsx";

export default function App() {
  return (
    <DataProvider>
      <FeaturesProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/users" element={<Users />} />
            <Route path="/page-requests" element={<PageRequests />} />
            <Route path="/pages" element={<ManagePages />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/feature/:id" element={<CustomFeature />} />
          </Route>
        </Routes>
      </FeaturesProvider>
    </DataProvider>
  );
}
