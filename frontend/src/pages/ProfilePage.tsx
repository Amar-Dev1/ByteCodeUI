import { Link } from "react-router-dom";
import { mockUser } from "../data/mockData";

const ProfilePage = () => {
  const user = mockUser;

  return (
    <div className="flex-1 p-gutter md:p-xl w-full lg:w-[80vw]">
      {/* Hero Header */}
      <div className="relative bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant mb-lg p-xl flex flex-col items-center justify-center gap-md">
        {/* Avatar */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-surface-container-lowest bg-surface-variant flex items-center justify-center relative shadow-sm">
          <span className="text-4xl md:text-5xl font-bold text-on-surface uppercase">
            {user.name.substring(0, 2)}
          </span>
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
            {user.name}
            {user.isVerified && (
              <span
                className="material-symbols-outlined text-secondary text-xl"
                title="Verified"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            )}
          </h2>
          <p className="font-body-md text-on-surface-variant text-body-md">
            @{user.username} • {user.role}
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
              {user.bio}
            </p>
            <div className="flex flex-col gap-sm">
              <div className="flex items-center gap-sm text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-sm">
                  location_on
                </span>{" "}
                San Francisco, CA
              </div>
              {user.links.website && (
                <div className="flex items-center gap-sm text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-sm">
                    link
                  </span>{" "}
                  <a
                    href={user.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {user.links.website.replace("https://", "")}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-sm text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-sm">
                  calendar_today
                </span>{" "}
                Joined March 2022
              </div>
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
              {user.links.github && (
                <a
                  href={user.links.github}
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
              {user.links.linkedin && (
                <a
                  href={user.links.linkedin}
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
              {user.interests.map((interest) => (
                <span
                  key={interest}
                  className="bg-primary-container/10 text-primary border border-primary/20 font-code-md text-code-md px-sm py-xs rounded"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
