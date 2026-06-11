import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const AVATAR_OPTIONS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jude",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aidan",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Lily",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver",
];

const SettingsPage = () => {
  const { backendUser, session, refreshUser, signOut, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    role: "",
    bio: "",
    interests: "",
    links: "",
    profileImg: AVATAR_OPTIONS[0],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (backendUser) {
      setFormData({
        name: backendUser.name || "",
        username: backendUser.username || "",
        role: backendUser.role || "",
        bio: backendUser.bio || "",
        interests: backendUser.interests || "",
        links: backendUser.links || "",
        profileImg: backendUser.profileImg || AVATAR_OPTIONS[0],
      });
    }
  }, [backendUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setSuccess(false);
      await axios.patch(
        "http://localhost:3000/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      await refreshUser();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving profile", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-md">
          <span className="material-symbols-outlined text-[48px] text-primary animate-spin">progress_activity</span>
          <p className="text-on-surface-variant font-body-md">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!backendUser) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-md text-center">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant">settings_alert</span>
          <p className="text-on-surface font-headline-sm">Could not load settings</p>
          <p className="text-on-surface-variant font-body-md max-w-sm">There was a problem connecting to the server. Please try signing out and signing back in.</p>
          <button onClick={signOut} className="mt-md bg-primary text-on-primary px-lg py-sm rounded-lg font-label-sm uppercase font-bold">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-gutter md:p-xl w-full flex flex-col gap-xl lg:w-[80vw]">
      {/* Header */}
      <header className="flex flex-col gap-sm">
        <h1 className="font-display text-headline-lg text-on-surface">
          Settings
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Manage your account preferences, profile details, and platform
          experience.
        </p>
      </header>

      {/* Settings Sections */}
      <div className="flex flex-col gap-xl w-full">
        {/* Profile Information */}
        <div className="w-full flex flex-col gap-lg">
          {/* Profile Settings Card */}
          <section className="bg-surface border border-outline-variant rounded-xl p-lg flex flex-col gap-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">
                manage_accounts
              </span>
              Profile Information
            </h2>

            {/* Avatar Selection */}
            <div className="flex items-center gap-lg">
              <div className="relative group cursor-pointer">
                <img
                  alt="Current Avatar"
                  src={formData.profileImg}
                  className="w-24 h-24 rounded-full object-cover border-2 border-surface-variant bg-surface-container-low"
                />
              </div>
              <div className="flex flex-col gap-sm w-full max-w-sm">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Select Avatar
                </label>
                <select
                  name="profileImg"
                  value={formData.profileImg}
                  onChange={handleChange}
                  className="bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all w-full"
                >
                  {AVATAR_OPTIONS.map((avatar, index) => (
                    <option key={avatar} value={avatar}>
                      Avatar {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <hr className="border-outline-variant border-t" />

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              {/* Name */}
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Display Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  type="text"
                />
              </div>

              {/* Username */}
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Username
                </label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  type="text"
                />
              </div>

              {/* Role/Headline */}
              <div className="flex flex-col gap-xs md:col-span-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Headline / Role
                </label>
                <input
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  type="text"
                />
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-xs md:col-span-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  rows={4}
                ></textarea>
              </div>
            </div>

            {/* Interests */}
            <div className="flex flex-col gap-xs mt-md">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Technical Interests (comma separated)
              </label>
              <input
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="React, Node.js, AI"
                className="bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                type="text"
              />
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-xs mt-md">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Social Links (comma separated)
              </label>
              <input
                name="links"
                value={formData.links}
                onChange={handleChange}
                placeholder="https://github.com/username, https://linkedin.com/in/username"
                className="bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                type="text"
              />
            </div>

            {/* Save Action */}
            <div className="flex justify-end pt-md border-t border-outline-variant mt-md items-center gap-4">
              {success && <span className="text-primary font-medium text-sm">Saved successfully!</span>}
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-lg py-sm rounded-lg font-label-sm text-label-sm uppercase font-bold transition-colors disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </section>
        </div>

        {/* Preferences */}
        <div className="w-full flex flex-col gap-lg">
          <section className="bg-surface border border-outline-variant rounded-xl p-lg flex flex-col gap-lg">
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
              <span className="material-symbols-outlined text-tertiary">
                tune
              </span>
              Account Options
            </h2>

            <div className="flex flex-col gap-lg">
              {/* Danger Zone */}
              <div className="flex flex-col gap-sm pt-sm">
                <span className="font-body-md text-body-md text-error font-medium">
                  Authentication
                </span>
                <button
                  onClick={signOut}
                  className="bg-transparent border border-error text-error hover:bg-error hover:text-on-error w-full py-sm rounded-lg font-label-sm text-label-sm uppercase font-bold transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
