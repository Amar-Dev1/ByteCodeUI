import { useParams, Link } from "react-router-dom";
import ReactMarkDown from "react-markdown";
import { FetchSingleBlog, UpdateBlogLikes } from "../services";
import { useEffect, useState } from "react";
import type { IBlogPost } from "../types/interfaces";

const BlogPostPage = () => {
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    (async () => {
      const fetchedPost = await FetchSingleBlog(slug!);
      setPost(fetchedPost);

      // Initialize local like state
      if (fetchedPost?._id) {
        const likedBlogs = JSON.parse(
          localStorage.getItem("likedBlogs") || "[]",
        );
        setIsLiked(likedBlogs.includes(fetchedPost._id));
      }
    })();
  }, [slug]);

  if (!post) {
    return (
      <div className="flex-1 flex justify-center items-center h-full w-full min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleLikeToggle = async () => {
    if (!post || !post._id) return;

    // Toggle optimistic state
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    // Update local counter
    setPost((prev) =>
      prev
        ? { ...prev, likes: (prev.likes || 0) + (newLikedState ? 1 : -1) }
        : prev,
    );

    // Sync with backend
    await UpdateBlogLikes(post._id, newLikedState ? 1 : -1);
  };

  return (
    <div className="w-full h-full pb-xl">
      <div className="max-w-5xl mx-auto w-full p-gutter md:p-xl flex flex-col gap-lg">
        {/* Article Canvas */}
        <article className="flex flex-col gap-lg overflow-hidden break-words w-full">
          {/* Breadcrumb / Category */}
          <div className="flex items-center gap-sm font-label-sm text-label-sm text-outline">
            <Link
              to="/community/blogs"
              className="hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
            <span className="text-primary-fixed-dim px-sm py-[2px] bg-primary-container/10 border border-primary-container/20 rounded-full uppercase truncate max-w-[200px]">
              {post.category || "General"}
            </span>
          </div>

          {/* Header */}
          <header className="flex flex-col gap-md">
            <h1 className="font-display text-display text-on-surface">
              {post.title}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              {post.description}
            </p>

            {/* Author Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md mt-sm py-md border-y border-outline-variant/50">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-full font-label-md text-label-md uppercase bg-surface-variant flex items-center justify-center text-on-surface border border-outline-variant shrink-0">
                  {post.authorUsername
                    ? post.authorUsername.substring(0, 2)
                    : "AN"}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-label-sm text-label-sm text-on-surface">
                    {post.authorUsername || "Anonymous"}
                  </span>
                  <span className="font-body-md text-[14px] text-outline">
                    {/* Assume a role or omit if there's no role in schema */}
                    Author
                  </span>
                </div>
                <div className="h-8 w-px bg-outline-variant/50 mx-md hidden sm:block" />
                <div className="hidden sm:flex flex-col justify-center font-body-md text-[14px] text-outline">
                  <span>
                    Published on{" "}
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString()
                      : "Recently"}
                  </span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Metrics (Likes, Comments, Share) */}
              <div className="flex items-center gap-md mt-sm sm:mt-0">
                <button
                  onClick={handleLikeToggle}
                  className={`flex items-center gap-xs hover:text-primary transition-colors group ${isLiked ? "text-primary" : "text-on-surface-variant"}`}
                >
                  <span
                    className="material-symbols-outlined group-hover:scale-110 transition-transform text-[20px]"
                    style={{
                      fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    favorite
                  </span>
                  <span className="font-label-sm">{post.likes || 0}</span>
                </button>
                <button className="flex items-center gap-xs text-on-surface-variant hover:text-secondary transition-colors group">
                  <span className="material-symbols-outlined group-hover:scale-110 transition-transform text-[20px]">
                    chat_bubble
                  </span>
                  <span className="font-label-sm">{post.comments || 0}</span>
                </button>
                <button className="flex items-center gap-xs text-on-surface-variant hover:text-tertiary transition-colors group ml-sm">
                  <span className="material-symbols-outlined group-hover:scale-110 transition-transform text-[20px]">
                    share
                  </span>
                  <span className="font-label-sm">Share</span>
                </button>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="w-full aspect-21/9 rounded-xl overflow-hidden border border-outline-variant bg-surface-container-low relative group flex items-center justify-center">
            {post.image ? (
              <img
                src={post.image.asset?.url || post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-[120px] text-primary/40 group-hover:scale-110 transition-transform duration-500">
                deployed_code
              </span>
            )}
          </div>

          {/* Body Content */}
          <div className="font-body-lg text-body-lg text-on-surface-variant flex flex-col gap-lg leading-relaxed max-w-full overflow-hidden prose prose-invert">
            {post.content ? (
              <ReactMarkDown
                components={{
                  img: ({ node, ...props }) => (
                    <img
                      className="max-w-full h-auto rounded-xl object-contain mx-auto"
                      {...props}
                    />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre
                      className="max-w-full overflow-x-auto whitespace-pre-wrap word-break-all bg-surface-container-low p-md rounded-xl text-sm border border-outline-variant"
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      className="text-primary hover:underline break-all"
                      {...props}
                    />
                  ),
                }}
              >
                {post.content}
              </ReactMarkDown>
            ) : (
              <p>Full article content coming soon...</p>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;
