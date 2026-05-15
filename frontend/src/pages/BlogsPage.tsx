import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FetchBlogs } from "../services";

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 3;

const BlogsPage = () => {
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await FetchBlogs();
        if (data) {
          setAllBlogs(data);
        } else {
          setAllBlogs([]);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Oops! We couldn't load the blogs right now.");
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  const categories = [
    "All Posts",
    "General",
    "Career",
    "Announcement",
    "Experience",
    "Advice",
  ];

  // Search filters by title only, independent of category filters
  const filteredBlogs = useMemo(() => {
    let result = allBlogs;

    // Search by title
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((blog: any) =>
        blog.title?.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (activeCategory !== "All Posts") {
      result = result.filter(
        (blog: any) =>
          blog.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    return result;
  }, [allBlogs, searchQuery, activeCategory]);

  const visibleBlogs = filteredBlogs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredBlogs.length;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_COUNT);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
  };

  return (
    <div className="flex-1 p-gutter md:p-xl max-w-container-max mx-auto w-full">
      <div className="flex flex-col gap-xl">
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-lg">
          <div className="flex flex-col gap-sm max-w-2xl">
            <h1 className="font-display text-display text-on-surface">
              Community Blogs
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Deep dives, technical post-mortems, and career advice from the
              ByteCode engineering network.
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-md bg-surface-container-lowest p-md rounded-xl border border-outline-variant">
          <div className="flex flex-wrap items-center gap-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`font-label-sm text-label-sm uppercase px-md py-xs rounded-full transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-surface-variant text-on-surface-variant hover:text-on-surface border border-transparent hover:border-outline-variant"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="w-full lg:w-auto flex items-center bg-surface border border-outline-variant rounded-lg px-md py-sm focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant mr-sm text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(INITIAL_COUNT);
              }}
              className="bg-transparent border-none outline-none font-body-md text-on-surface placeholder:text-on-surface-variant w-full lg:w-64 focus:ring-0 p-0"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setVisibleCount(INITIAL_COUNT);
                }}
                className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        {!loading && !error && (searchQuery || activeCategory !== "All Posts") && (
          <p className="font-body-md text-on-surface-variant text-sm -mt-md">
            Showing {filteredBlogs.length} result{filteredBlogs.length !== 1 ? "s" : ""}
            {searchQuery && <> for "<span className="text-primary">{searchQuery}</span>"</>}
            {activeCategory !== "All Posts" && <> in <span className="text-secondary">{activeCategory}</span></>}
          </p>
        )}

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-error-container text-on-error-container p-xl rounded-xl text-center flex flex-col items-center gap-md">
            <span className="material-symbols-outlined text-[48px]">
              wifi_off
            </span>
            <h3 className="font-headline-md">{error}</h3>
            <p className="font-body-md">
              Please check your connection or try again later.
            </p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="bg-surface-container-low text-on-surface-variant p-xl rounded-xl text-center flex flex-col items-center gap-md border border-outline-variant">
            <span className="material-symbols-outlined text-[48px]">
              article
            </span>
            <h3 className="font-headline-md text-on-surface">
              {searchQuery ? "No Matching Blogs" : "No Blogs Yet!"}
            </h3>
            <p className="font-body-md">
              {searchQuery
                ? "Try a different search term or clear the filters."
                : "Check back soon for new community blogs."}
            </p>
          </div>
        ) : (
          <>
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
              {visibleBlogs.map((post) => {
                return (
                  <Link
                    key={post._id}
                    to={`/community/blogs/${post.slug?.current || post.slug}`}
                    className="flex flex-col bg-surface-container-low rounded-xl border border-outline-variant overflow-hidden group hover:border-primary transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Standard Post Styling */}
                    {post.image ? (
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={post.image.asset?.url || post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-48 overflow-hidden relative bg-secondary-container/20 flex items-center justify-center group-hover:bg-secondary-container/30 transition-colors">
                        <span className="material-symbols-outlined text-[60px] text-secondary/40 group-hover:scale-110 transition-transform duration-500">
                          lightbulb
                        </span>
                      </div>
                    )}
                    <div className="p-md flex flex-col grow gap-sm">
                      <div className="flex items-center gap-sm mb-xs">
                        <span className="font-code-md text-code-md uppercase bg-secondary/10 text-secondary px-sm py-xs rounded border border-secondary/20">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-secondary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 grow">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-sm border-t border-outline-variant/50">
                        <span className="font-body-md text-on-surface-variant text-sm flex items-center gap-xs">
                          <span className="material-symbols-outlined text-[16px]">
                            calendar_today
                          </span>
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString()
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
                );
              })}
            </div>
          </>
        )}

        {/* Load More */}
        {!loading && !error && hasMore && (
          <div className="flex justify-center mt-xl pb-xl">
            <button
              onClick={handleLoadMore}
              className="font-body-md text-body-md font-medium text-on-surface border border-outline-variant hover:bg-surface-variant px-xl py-sm rounded-full transition-colors flex items-center gap-sm cursor-pointer"
            >
              Load More Archives
              <span className="material-symbols-outlined text-[20px]">
                expand_more
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
