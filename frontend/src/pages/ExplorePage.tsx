import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { IBlogPost, IEvent, ISearchUser } from "../types/interfaces";
import { SearchBlogs, SearchEvents, FilterUsers } from "../services";

type FilterType = "blogs" | "events" | "users";

const FILTERS: { key: FilterType; label: string; icon: string }[] = [
  { key: "blogs", label: "Blogs", icon: "article" },
  { key: "events", label: "Events", icon: "calendar_month" },
  { key: "users", label: "Users", icon: "group" },
];

const ExplorePage = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("blogs");
  const [blogs, setBlogs] = useState<IBlogPost[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [users, setUsers] = useState<ISearchUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setHasSearched(true);

    try {
      if (filter === "blogs") {
        const data = await SearchBlogs(query);
        setBlogs(data || []);
        setEvents([]);
        setUsers([]);
      } else if (filter === "events") {
        const data = await SearchEvents(query);
        setEvents(data || []);
        setBlogs([]);
        setUsers([]);
      } else {
        const data = await FilterUsers(query);
        setUsers(data || []);
        setBlogs([]);
        setEvents([]);
      }
    } catch {
      console.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const hasResults =
    (filter === "blogs" && blogs.length > 0) ||
    (filter === "events" && events.length > 0) ||
    (filter === "users" && users.length > 0);

  return (
    <div className="w-full max-w-full lg:w-[80vw] px-gutter md:px-xl flex flex-col min-h-[85vh] overflow-x-hidden">
      {/* Centered Search Section */}
      <motion.div
        className={`flex flex-col items-center justify-center w-full transition-all duration-500 ${
          hasSearched ? "pt-xl pb-lg" : "flex-1"
        }`}
        layout
      >
        <h1 className="font-display text-[36px] md:text-display text-on-surface font-bold mb-sm text-center">
          Explore <span className="text-primary">ByteCode</span>
        </h1>
        <p className=" text-center text-body my-5 font-semibold ">
          Search across blogs, events, and community members
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-sm mb-lg w-full">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setFilter(f.key);
                setHasSearched(false);
                setBlogs([]);
                setEvents([]);
                setUsers([]);
              }}
              className={`flex items-center gap-xs px-lg py-sm rounded-lg text-label-lg font-medium transition-all duration-200 border cursor-pointer ${
                filter === f.key
                  ? "bg-primary text-on-primary border-primary shadow-md"
                  : "bg-surface-container-low text-on-surface-variant border-outline-variant hover:border-primary hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {f.icon}
              </span>
              {f.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-[80%] max-w-2xl flex flex-col sm:flex-row gap-sm">
          <div className="relative flex-1 group">
            <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
              search
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Search ${filter}...`}
              className="w-full bg-surface text-on-surface placeholder:text-on-surface-variant rounded-lg py-md pl-xl pr-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-body-lg outline-none transition-all shadow-sm"
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="px-xl py-md bg-primary text-on-primary font-label-lg font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-xs shadow-md cursor-pointer"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin text-[20px]">
                progress_activity
              </span>
            ) : (
              <span className="material-symbols-outlined text-[20px]">
                search
              </span>
            )}
            Search
          </button>
        </div>
      </motion.div>

      {/* Results Section */}
      <AnimatePresence mode="wait">
        {hasSearched && !loading && (
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full pb-5"
          >
            {!hasResults ? (
              <div className="flex flex-col items-center justify-center py-2xl text-center">
                <span className="material-symbols-outlined text-[64px] text-on-surface-variant/40 mb-md">
                  search_off
                </span>
                <p className="text-on-surface-variant font-body-lg">
                  No {filter} found matching "
                  <span className="text-on-surface font-medium">{query}</span>"
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-sm mb-lg border-b border-outline-variant pb-sm">
                  <span className="material-symbols-outlined text-on-surface-variant">
                    {FILTERS.find((f) => f.key === filter)?.icon}
                  </span>
                  <h2 className="font-headline-md text-on-surface font-bold capitalize">
                    {filter}
                  </h2>
                  <span className="text-on-surface-variant font-body-md ml-auto">
                    {filter === "blogs"
                      ? blogs.length
                      : filter === "events"
                        ? events.length
                        : users.length}{" "}
                    result
                    {(filter === "blogs"
                      ? blogs.length
                      : filter === "events"
                        ? events.length
                        : users.length) !== 1
                      ? "s"
                      : ""}
                  </span>
                </div>

                {/* Blog Results */}
                {filter === "blogs" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
                    {blogs.map((post, i) => (
                      <motion.div
                        key={post._id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          to={`/community/blogs/${typeof post.slug === 'object' ? post.slug?.current : post.slug}`}
                          className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden hover:border-primary transition-colors group cursor-pointer flex flex-col h-full"
                        >
                          <div className="h-40 relative overflow-hidden shrink-0">
                            {post.image ? (
                              <img
                                src={post.image.asset?.url || post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-secondary-container/20 flex items-center justify-center group-hover:bg-secondary-container/30 transition-colors">
                                <span className="material-symbols-outlined text-[60px] text-secondary/40 group-hover:scale-110 transition-transform duration-500">
                                  lightbulb
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-md flex flex-col grow gap-sm">
                            <div className="flex items-center gap-sm mb-xs">
                              <span className="font-code-md text-code-md uppercase bg-secondary/10 text-secondary px-sm py-xs rounded border border-secondary/20">
                                {post.category || "General"}
                              </span>
                            </div>
                            <h3 className="font-headline-sm text-on-surface group-hover:text-secondary transition-colors font-bold line-clamp-1">
                              {post.title}
                            </h3>
                            <p className="font-body-md text-on-surface-variant line-clamp-2 grow">
                              {post.description}
                            </p>
                            <div className="flex items-center justify-between mt-auto pt-sm border-t border-outline-variant/50">
                              <span className="font-body-md text-on-surface-variant text-sm flex items-center gap-xs">
                                <span className="material-symbols-outlined text-[16px]">
                                  calendar_today
                                </span>
                                {post.publishedAt
                                  ? new Date(
                                      post.publishedAt,
                                    ).toLocaleDateString()
                                  : "Recently"}
                              </span>
                              <div className="flex items-center gap-xs text-on-surface-variant">
                                <span className="material-symbols-outlined text-[18px]">
                                  favorite
                                </span>
                                <span className="font-label-sm text-sm">
                                  {post.likes || 0}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Event Results */}
                {filter === "events" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
                    {events.map((event, i) => (
                      <motion.div
                        key={event._id || i}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          to={`/community/events/${event._id}`}
                          className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden hover:border-primary transition-colors group cursor-pointer flex flex-col h-full"
                        >
                          <div className="h-40 relative bg-surface-variant overflow-hidden shrink-0">
                            <div className="absolute inset-0 bg-linear-to-t from-surface-container-low to-transparent z-10" />
                            {event.image ? (
                              <img
                                src={
                                  (event.image as any)?.asset?.url ||
                                  event.image
                                }
                                alt={event.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-105 transition-transform duration-500">
                                <span className="material-symbols-outlined text-[80px] text-primary">
                                  {event.category === "Activity"
                                    ? "code_blocks"
                                    : "group"}
                                </span>
                              </div>
                            )}
                            <div className="absolute top-sm right-sm z-20 bg-surface/80 backdrop-blur-sm px-sm py-xs border border-outline-variant rounded text-label-sm text-on-surface font-label-sm">
                              {event.startDate
                                ? new Date(event.startDate).toLocaleDateString()
                                : ""}
                            </div>
                          </div>
                          <div className="p-lg flex flex-col grow relative z-20">
                            <h3 className="font-headline-sm text-on-surface group-hover:text-primary transition-colors font-bold mb-xs line-clamp-1">
                              {event.title}
                            </h3>
                            <p className="font-body-md text-on-surface-variant line-clamp-2 mb-md grow">
                              {event.description}
                            </p>
                            <div className="flex items-center gap-xs text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider mt-auto pt-sm border-t border-outline-variant/50">
                              <span className="line-clamp-1">
                                {event.location}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* User Results */}
                {filter === "users" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
                    {users.map((user: any, i) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-surface-container-low border border-outline-variant rounded-xl p-lg flex items-center gap-lg hover:border-primary transition-colors group"
                      >
                        <Link to={`/community/users/${user.id}`}>
                          <img
                            src={
                              user.profileImg ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
                            }
                            alt={user.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-outline-variant group-hover:border-primary transition-colors shrink-0"
                          />
                        </Link>
                        <div className="flex flex-col min-w-0">
                          <Link to={`/community/users/${user.id}`}>
                            <h3 className="font-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors truncate">
                              {user.name}
                            </h3>
                          </Link>
                          <span className="font-body-md text-on-surface-variant truncate">
                            @{user.username}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-2xl"
          >
            <span className="material-symbols-outlined text-[48px] text-primary animate-spin">
              progress_activity
            </span>
            <p className="text-on-surface-variant font-body-lg mt-md">
              Searching {filter}...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExplorePage;
