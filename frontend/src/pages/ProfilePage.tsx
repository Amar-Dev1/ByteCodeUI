import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { backendUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-md">
          <span className="material-symbols-outlined text-[48px] text-primary animate-spin">progress_activity</span>
          <p className="text-on-surface-variant font-body-md">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!backendUser) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-md text-center">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant">account_circle</span>
          <p className="text-on-surface font-headline-sm">Could not load profile</p>
          <p className="text-on-surface-variant font-body-md max-w-sm">There was a problem connecting to the server. Please try signing out and signing back in.</p>
        </div>
      </div>
    );
  }

  // parse interests from comma separated string
  const interests = backendUser.interests ? backendUser.interests.split(',').map(i => i.trim()).filter(i => i) : [];
  
  // parse links from comma separated string
  const linksArray = backendUser.links ? backendUser.links.split(',').map(i => i.trim()).filter(i => i) : [];
  const githubLink = linksArray.find(l => l.includes('github.com'));
  const linkedinLink = linksArray.find(l => l.includes('linkedin.com'));
  const websiteLink = linksArray.find(l => !l.includes('github.com') && !l.includes('linkedin.com'));

  return (
    <div className="flex-1 p-gutter md:p-xl w-full lg:w-[80vw]">
      {/* Hero Header */}
      <div className="relative bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant mb-lg p-xl flex flex-col items-center justify-center gap-md">
        {/* Avatar */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-surface-container-lowest bg-surface-variant flex items-center justify-center relative shadow-sm overflow-hidden">
          {backendUser.profileImg ? (
            <img src={backendUser.profileImg} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl md:text-5xl font-bold text-on-surface uppercase">
              {backendUser.name ? backendUser.name.substring(0, 2) : backendUser.username?.substring(0, 2)}
            </span>
          )}
          <div
            className="absolute bottom-1 right-1 bg-surface-container-lowest rounded-full p-xs border border-outline-variant"
            title="Currently Building"
          >
            <span className="text-xl">🏗️</span>
          </div>
        </div>

        {/* Name & Title */}
        <div className="text-center flex flex-col items-center">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs flex items-center justify-center gap-sm">
            {backendUser.name || backendUser.username}
          </h2>
          <p className="font-body-md text-on-surface-variant text-body-md">
            @{backendUser.username} {backendUser.role ? `• ${backendUser.role}` : ''}
          </p>
        </div>

        {/* Actions */}
          <Link to="/community/settings" className="bg-surface-container-lowest border border-outline-variant text-on-surface font-label-sm text-label-sm px-lg py-4 rounded-lg hover:bg-surface-variant transition-colors flex items-center justify-center gap-sm mt-sm">Edit Profile</Link>
      </div>

      {/* Content Grid — sidebar + main area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Left Column: About & Skills */}
        <div className="lg:col-span-1 flex flex-col gap-lg">
          {/* Bio Card */}
          <div className="bg-surface-container border border-outline-variant rounded-xl p-lg">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">
                person_book
              </span>{" "}
              About
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md">
              {backendUser.bio || "No bio provided."}
            </p>
            <div className="flex flex-col gap-sm">
              <div className="flex items-center gap-sm text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-sm">
                  location_on
                </span>{" "}
                Earth
              </div>
              {websiteLink && (
                <div className="flex items-center gap-sm text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-sm">
                    link
                  </span>{" "}
                  <a
                    href={websiteLink.startsWith('http') ? websiteLink : `https://${websiteLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline truncate max-w-[200px]"
                  >
                    {websiteLink.replace("https://", "").replace("http://", "")}
                  </a>
                </div>
              )}
            </div>
          </div>
          {/* Social Links */}
          <div className="bg-surface-container border border-outline-variant rounded-xl p-lg">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-sm">
              <span className="material-symbols-outlined text-on-surface">
                hub
              </span>{" "}
              Connect
            </h3>
            <div className="flex flex-col gap-sm">
              {githubLink && (
                <a
                  href={githubLink.startsWith('http') ? githubLink : `https://${githubLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-md p-sm rounded hover:bg-surface-variant transition-colors group"
                >
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                    terminal
                  </span>
                  <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">
                    GitHub
                  </span>
                </a>
              )}
              {linkedinLink && (
                <a
                  href={linkedinLink.startsWith('http') ? linkedinLink : `https://${linkedinLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-md p-sm rounded hover:bg-surface-variant transition-colors group"
                >
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">
                    work
                  </span>
                  <span className="font-body-md text-body-md text-on-surface group-hover:text-secondary transition-colors">
                    LinkedIn
                  </span>
                </a>
              )}
              {!githubLink && !linkedinLink && (
                <p className="text-sm text-gray-500">No social links provided.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Interests & Activity */}
        <div className="lg:col-span-2 flex flex-col gap-lg">
          {/* Skills/Interests Card */}
          <div className="bg-surface-container border border-outline-variant rounded-xl p-lg">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary">
                code_blocks
              </span>{" "}
              Interests & Tech
            </h3>
            <div className="flex flex-wrap gap-sm">
              {interests.length > 0 ? interests.map((interest) => (
                <span
                  key={interest}
                  className="bg-primary-container/10 text-primary border border-primary/20 font-code-md text-code-md px-sm py-xs rounded"
                >
                  {interest}
                </span>
              )) : (
                <p className="text-sm text-gray-500">No interests added.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
