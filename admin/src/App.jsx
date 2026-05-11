import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminApiServices from "./pages/AdminApiServices.jsx";
import AdminGames from "./pages/AdminGames.jsx";
import AdminPlatforms from "./pages/AdminPlatforms.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminSettings from "./pages/AdminSettings.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route element={<RequireAuth />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="api-services" element={<AdminApiServices />} />
          <Route path="games" element={<AdminGames />} />
          <Route path="platforms" element={<AdminPlatforms />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
