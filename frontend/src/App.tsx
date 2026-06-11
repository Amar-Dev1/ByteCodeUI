import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import ExplorePage from "./pages/ExplorePage";
import BlogsPage from "./pages/BlogsPage";
import BlogPostPage from "./pages/BlogPostPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import TechNewsPage from "./pages/TechNewsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SetUsernamePage from "./pages/SetUsernamePage";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/community" replace />} />
      {/* Auth pages — standalone, no sidebar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Must be authenticated to set username */}
      <Route element={<ProtectedRoute />}>
        <Route path="/set-username" element={<SetUsernamePage />} />
      </Route>

      {/* Main app with sidebar layout */}
      <Route element={<ProtectedRoute requireUsername />}>
        <Route element={<AppLayout />}>
          <Route path="/community">
            <Route index element={<ExplorePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="events/:id" element={<EventDetailsPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="blogs/:slug" element={<BlogPostPage />} />
            <Route path="news" element={<TechNewsPage />} />
            <Route path="users/:id" element={<UserProfilePage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
