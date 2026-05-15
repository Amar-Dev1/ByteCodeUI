import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
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

function App() {
  return (
    <Routes>
      {/* Auth pages — standalone, no sidebar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Main app with sidebar layout */}
      <Route element={<AppLayout />}>
        {/* <Route path="/" element={<div>Landing page</div>} */}
        <Route path="/community">
          <Route index element={<ExplorePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:id" element={<EventDetailsPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="blogs/:slug" element={<BlogPostPage />} />
          <Route path="news" element={<TechNewsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
