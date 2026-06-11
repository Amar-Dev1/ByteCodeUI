import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchUserById } from "../services";

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await FetchUserById(id!);
        if (data && !data.error) {
          setUser(data);
        } else {
          setError("User not found or an error occurred.");
        }
      } catch (err) {
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      loadUser();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-md">
          <span className="material-symbols-outlined text-[48px] text-primary animate-spin">progress_activity</span>
          <p className="text-on-surface-variant font-body-md">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-md text-center">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant">account_circle</span>
          <p className="text-on-surface font-headline-sm">Could not load profile</p>
          <p className="text-on-surface-variant font-body-md max-w-sm">
            {error || "The requested user could not be found."}
          </p>
        </div>
      </div>
    );
  }

  // parse interests from comma separated string
  const interests = user.interests ? user.interests.split(',').map((i: string) => i.trim()).filter((i: string) => i) : [];
  
  // parse links from comma separated string
  const linksArray = user.links ? user.links.split(',').map((i: string) => i.trim()).filter((i: string) => i) : [];
  const githubLink = linksArray.find((l: string) => l.includes('github.com'));
  const linkedinLink = linksArray.find((l: string) => l.includes('linkedin.com'));
  const websiteLink = linksArray.find((l: string) => !l.includes('github.com') && !l.includes('linkedin.com'));

  return (
    <div className="flex-1 p-gutter md:p-xl w-full lg:w-[80vw]">
      {/* Hero Header */}
      <div className="relative bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant mb-lg p-xl flex flex-col items-center justify-center gap-md">
        {/* Avatar */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-surface-container-lowest bg-surface-variant flex items-center justify-center relative shadow-sm overflow-hidden">
          {user.profileImg ? (
            <img src={user.profileImg} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl md:text-5xl font-bold text-on-surface uppercase">
              {user.name ? user.name.substring(0, 2) : user.username?.substring(0, 2)}
            </span>
          )}
          {user.status && (
            <div
              className="absolute bottom-1 right-1 bg-surface-container-lowest rounded-full p-xs border border-outline-variant flex items-center justify-center"
              title="Current Status"
            >
              <span className="text-xl flex items-center justify-center" style={{ lineHeight: 1 }}>{user.status.split(' ')[0]}</span>
            </div>
          )}
        </div>

        {/* Name & Title */}
        <div className="text-center flex flex-col items-center">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs flex items-center justify-center gap-sm">
            {user.name || user.username}
          </h2>
          <p className="font-body-md text-on-surface-variant text-body-md">
            @{user.username} {user.role ? `• ${user.role}` : ''}
          </p>
          {user.status && (
            <div className="mt-sm bg-surface-variant text-on-surface-variant px-sm py-xs rounded-full font-label-sm text-sm border border-outline-variant">
              {user.status}
            </div>
          )}
        </div>
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
              {user.bio || "No bio provided."}
            </p>
            <div className="flex flex-col gap-sm">
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
              {interests.length > 0 ? interests.map((interest: string) => (
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

export default UserProfilePage;
