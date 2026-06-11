import { useParams, Link } from "react-router-dom";
import ReactMarkDown from "react-markdown";
import { FetchSingleBlog, UpdateBlogLikes, FetchBlogComments, UpdateBlogComments } from "../services";
import { useEffect, useState } from "react";
import type { IBlogPost, IComment } from "../types/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const BlogPostPage = () => {
  const { backendUser } = useAuth();
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
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

    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    setPost((prev) =>
      prev
        ? { ...prev, likes: (prev.likes || 0) + (newIsLiked ? 1 : -1) }
        : prev,
    );

    let likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");
    if (newIsLiked) {
      if (!likedBlogs.includes(post._id)) {
        likedBlogs.push(post._id);
      }
    } else {
      likedBlogs = likedBlogs.filter((id: string) => id !== post._id);
    }
    localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));

    await UpdateBlogLikes(post._id, newIsLiked ? 1 : -1);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post?.title,
          text: post?.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleOpenComments = async () => {
    setShowComments(true);
    if (post?._id) {
      const fetchedComments = await FetchBlogComments(post._id);
      setCommentsList(fetchedComments || []);
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim() || !post?._id || !backendUser) return;
    
    setIsPostingComment(true);
    const commentData = {
      username: backendUser.username || "Anonymous",
      profileImg: backendUser.profileImg || "",
      comment: newComment.trim(),
      createdAt: new Date().toISOString(),
    };

    // Optimistic UI
    const optimisticComment: IComment = {
      _key: Math.random().toString(36).substring(7),
      ...commentData
    };
    setCommentsList(prev => [...prev, optimisticComment]);
    setNewComment("");

    await UpdateBlogComments(post._id, commentData);
    setIsPostingComment(false);
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
                  className={`flex items-center gap-xs transition-colors group ${isLiked ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
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
                <button 
                  onClick={handleOpenComments}
                  className="flex items-center gap-xs text-on-surface-variant hover:text-secondary transition-colors group"
                >
                  <span className="material-symbols-outlined group-hover:scale-110 transition-transform text-[20px]">
                    chat_bubble
                  </span>
                  <span className="font-label-sm">{Array.isArray(post.comments) ? post.comments.length : (post.comments || 0)}</span>
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-xs text-on-surface-variant hover:text-tertiary transition-colors group ml-sm"
                >
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

      {/* Comments Modal */}
      <AnimatePresence>
        {showComments && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowComments(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2  bg-surface border border-outline-variant rounded-xl shadow-xl z-50 flex flex-col max-h-[80vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-md border-b border-outline-variant">
                <h3 className="font-headline-sm text-on-surface">Comments ({commentsList.length})</h3>
                <button onClick={() => setShowComments(false)} className="text-on-surface-variant hover:text-on-surface transition-colors p-xs rounded-full hover:bg-surface-variant flex items-center justify-center">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-md flex flex-col gap-md bg-surface-container-lowest">
                {commentsList.length === 0 ? (
                  <p className="text-on-surface-variant font-body-md text-center py-xl">No comments yet. Be the first to share your thoughts!</p>
                ) : (
                  commentsList.map((c) => (
                    <div key={c._key} className="flex gap-sm">
                      <div className="w-10 h-10 rounded-full bg-surface-variant shrink-0 overflow-hidden border border-outline-variant">
                        {c.profileImg ? (
                          <img src={c.profileImg} alt={c.username} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-primary text-sm uppercase">
                            {c.username.substring(0,2)}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col bg-surface-container-low p-sm rounded-lg rounded-tl-none border border-outline-variant/50 flex-1">
                        <div className="flex items-baseline justify-between gap-md mb-xs">
                          <span className="font-label-sm text-on-surface">{c.username}</span>
                          <span className="text-[12px] text-on-surface-variant">{new Date(c.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="font-body-md text-on-surface-variant break-words">{c.comment}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {backendUser ? (
                <div className="p-md border-t border-outline-variant bg-surface flex gap-sm items-center">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                    placeholder="Add a comment..."
                    className="flex-1 bg-surface-container-low border border-outline-variant rounded-full px-md py-sm font-body-md text-on-surface focus:outline-none focus:border-primary"
                  />
                  <button
                    onClick={handlePostComment}
                    disabled={isPostingComment || !newComment.trim()}
                    className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center disabled:opacity-50 transition-colors shrink-0"
                  >
                    <span className="material-symbols-outlined text-[20px]">send</span>
                  </button>
                </div>
              ) : (
                <div className="p-md border-t border-outline-variant bg-surface text-center">
                  <p className="text-on-surface-variant font-body-md">Log in to post a comment.</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPostPage;
