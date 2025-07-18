import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  BookOpen,
  Tag,
  User,
  Heart,
  MessageCircle,
  ThumbsUp,
} from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { ShareToast, ShareSuccessToast, LikeToast } from "./custom-toast";

type BlogPost = {
  _id: string;
  title: string;
  imgUrl: string;
  des: string;
  category: string;
  time: string;
  shortDes: string;
  featured?: boolean;
  author?: string;
  readTime?: string;
  tags?: string[];
  likes?: number;
  loves?: number;
  comments?: number;
};

interface BlogDetailsPageProps {
  blog: BlogPost;
  allBlogs: BlogPost[];
}

type Comment = {
  _id: string;
  name: string;
  comment: string;
  createdAt: string;
};

// Custom safe scroll animation hook
const useSafeScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

export default function BlogDetailsPage({
  blog,
  allBlogs,
}: BlogDetailsPageProps) {
  const navigate = useNavigate();
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoved, setIsLoved] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<{
    name: string;
    comment: string;
  }>({ name: "", comment: "" });
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [likesCount, setLikesCount] = useState(blog.likes || 0);
  const [lovesCount, setLovesCount] = useState(blog.loves || 0);

  // Safe scroll animations
  const { ref: heroRef, isVisible: heroVisible } = useSafeScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } =
    useSafeScrollAnimation();
  const { ref: commentsRef, isVisible: commentsVisible } =
    useSafeScrollAnimation();
  const { ref: relatedRef, isVisible: relatedVisible } =
    useSafeScrollAnimation();

  // Remove useScrollAnimation temporarily to fix scroll issue
  // const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  // const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  // const { ref: relatedRef, isVisible: relatedVisible } = useScrollAnimation();

  // Check if user has liked/loved this blog on component mount
  useEffect(() => {
    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");
    const lovedBlogs = JSON.parse(localStorage.getItem("lovedBlogs") || "[]");

    setIsLiked(likedBlogs.includes(blog._id));
    setIsLoved(lovedBlogs.includes(blog._id));
  }, [blog._id]);

  // Fetch comments when component mounts
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoadingComments(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/blog/comments/${blog._id}`
        );
        if (response.ok) {
          const result = await response.json();
          setComments(result.comments || []);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error("Failed to load comments", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setIsLoadingComments(false);
      }
    };

    if (blog._id) {
      fetchComments();
    }
  }, [blog._id]);

  useEffect(() => {
    // Simply show all other blogs except the current one, maximum 3
    const otherBlogs = allBlogs.filter((b) => b._id !== blog._id).slice(0, 3);
    setRelatedBlogs(otherBlogs);
  }, [blog, allBlogs]);

  // Immediate scroll reset without any delays
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [blog._id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog?.title,
          text: blog?.shortDes,
          url: window.location.href,
        });
        toast(<ShareSuccessToast />, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "custom-toast",
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast(<ShareToast />, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "custom-toast",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share link. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSharing(false);
    }
  };

  const handleLike = async () => {
    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");
    const hasLiked = likedBlogs.includes(blog._id);

    if (hasLiked) {
      toast.info("You have already liked this blog!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/blog/like/${blog._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setIsLiked(true);
        setLikesCount(result.likes);

        // Update local storage
        const updatedLikedBlogs = [...likedBlogs, blog._id];
        localStorage.setItem("likedBlogs", JSON.stringify(updatedLikedBlogs));

        toast(<LikeToast />, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "custom-toast",
        });
      }
    } catch (error) {
      console.error("Error liking blog:", error);
      toast.error("Failed to like blog. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleLove = async () => {
    const lovedBlogs = JSON.parse(localStorage.getItem("lovedBlogs") || "[]");
    const hasLoved = lovedBlogs.includes(blog._id);

    if (hasLoved) {
      toast.info("You have already loved this blog!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/blog/love/${blog._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setIsLoved(true);
        setLovesCount(result.loves);

        // Update local storage
        const updatedLovedBlogs = [...lovedBlogs, blog._id];
        localStorage.setItem("lovedBlogs", JSON.stringify(updatedLovedBlogs));

        toast.success("❤️ You loved this blog!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error loving blog:", error);
      toast.error("Failed to love blog. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.comment.trim()) return;

    setIsPostingComment(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/blog/comments/${blog._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newComment.name.trim() || "Anonymous",
            comment: newComment.comment.trim(),
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setComments([result.comment, ...comments]);
        setNewComment({ name: "", comment: "" });

        toast.success("Comment added successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        throw new Error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsPostingComment(false);
    }
  };

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return `${names[0].charAt(0).toUpperCase()}${names[1]
      .charAt(0)
      .toUpperCase()}`;
  };

  const formatCommentTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="min-h-screen relative">
      {/* Back Button */}
      <Button
        onClick={() => navigate("/")}
        className="fixed top-24 left-20 z-40 floating-action-btn rounded-full p-3 hover:scale-105 transition-all duration-300"
      >
        <ArrowLeft className="h-5 w-5 text-white" />
      </Button>

      {/* Share Button */}
      <Button
        onClick={handleShare}
        disabled={isSharing}
        className={`fixed top-24 right-20 z-40 floating-action-btn rounded-full p-3 hover:scale-105 transition-all duration-300 ${
          isSharing ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSharing ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <Share2 className="h-5 w-5 text-white" />
        )}
      </Button>

      {/* Hero Section with animations */}
      <section
        ref={heroRef as any}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className={`container mx-auto px-4 py-20 relative z-10 transition-all duration-1000 ${
            heroVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative h-96 md:h-[32rem] overflow-hidden">
                <img
                  src={blog.imgUrl || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="glass-button text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    {blog.category}
                  </span>
                </div>

                {/* Featured Badge */}
                {blog.featured && (
                  <div className="absolute top-6 right-6">
                    <span className="glass-button text-yellow-300 px-4 py-2 rounded-full text-sm font-medium">
                      ⭐ Featured
                    </span>
                  </div>
                )}

                {/* Title and Meta */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {blog.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>{blog.author || "Alamin"}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDate(blog.time)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{getTimeAgo(blog.time)}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>{blog.readTime || "5 min read"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section with animations */}
      <section className="pb-16 px-4 relative">
        <div
          ref={contentRef as any}
          className={`container mx-auto max-w-4xl transition-all duration-1000 delay-300 ${
            contentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="glass-card rounded-3xl p-8 md:p-12">
            {/* Short Description */}
            <div className="mb-8 pb-8 border-b border-sky-500/20">
              <p className="text-xl text-gray-300 leading-relaxed italic">
                {blog.shortDes}
              </p>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg prose-invert max-w-none blog-content">
              <div className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                {blog.des}
              </div>
            </div>

            {/* Tags */}
            {blog?.tags && blog?.tags?.length > 0 && (
              <div className="mt-12 pt-8 border-t border-sky-500/20">
                <h3 className="text-white text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="glass-button text-sky-300 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Engagement Section */}
            <div className="mt-12 pt-8 border-t border-sky-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 p-3 rounded-full transition-all duration-300 ${
                      isLiked
                        ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                        : "glass-button text-gray-300 hover:text-blue-400"
                    }`}
                  >
                    <ThumbsUp
                      className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                    />
                    <span>{likesCount}</span>
                  </button>
                  <button
                    onClick={handleLove}
                    className={`flex items-center space-x-2 p-3 rounded-full transition-all duration-300 ${
                      isLoved
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        : "glass-button text-gray-300 hover:text-red-400"
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${isLoved ? "fill-current" : ""}`}
                    />
                    <span>{lovesCount}</span>
                  </button>

                  <div className="flex items-center space-x-2 glass-button p-3 rounded-full text-gray-300">
                    <MessageCircle className="h-5 w-5" />
                    <span>{comments?.length || 0}</span>
                  </div>
                </div>

                <Button
                  onClick={handleShare}
                  disabled={isSharing}
                  className={`glass-button rounded-full p-3 hover:scale-105 transition-all duration-300 ${
                    isSharing ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSharing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Share2 className="h-5 w-5 text-white" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section with animations */}
      <section className="py-16 px-4 relative">
        <div
          ref={commentsRef as any}
          className={`container mx-auto max-w-4xl transition-all duration-1000 delay-500 ${
            commentsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <MessageCircle className="h-6 w-6 text-sky-400" />
              <h2 className="text-2xl font-bold text-white">Comments</h2>
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="mb-12">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your name (optional)"
                  value={newComment.name}
                  onChange={(e) =>
                    setNewComment({ ...newComment, name: e.target.value })
                  }
                  className="w-full max-w-xs px-4 py-2.5 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-sky-400 transition-colors"
                  disabled={isPostingComment}
                />
                <div className="flex gap-3">
                  <textarea
                    placeholder="Share your thoughts..."
                    value={newComment.comment}
                    onChange={(e) =>
                      setNewComment({ ...newComment, comment: e.target.value })
                    }
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-sky-400 transition-colors resize-none"
                    rows={3}
                    required
                    disabled={isPostingComment}
                  />
                  <button
                    type="submit"
                    disabled={isPostingComment || !newComment.comment.trim()}
                    className={`px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors font-medium self-start ${
                      isPostingComment || !newComment.comment.trim()
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isPostingComment ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Posting...
                      </div>
                    ) : (
                      "Post"
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {isLoadingComments ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400 mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading comments...</p>
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-gray-500" />
                  </div>
                  <p className="text-gray-400">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                </div>
              ) : (
                comments?.map((comment, index) => (
                  <div
                    key={comment._id}
                    className={`flex gap-4 p-4 bg-gray-800/30 rounded-xl transition-all duration-500 ${
                      commentsVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {getInitials(comment.name)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-white font-semibold">
                          {comment.name}
                        </h4>
                        <span className="text-gray-400 text-sm">
                          {formatCommentTime(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles with animations */}
      <section className="py-16 px-4 relative">
        <div
          ref={relatedRef as any}
          className={`container mx-auto max-w-6xl transition-all duration-1000 delay-700 ${
            relatedVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Related Articles
          </h2>

          {relatedBlogs.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-400 text-lg">No other blogs available</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs?.map((relatedBlog, index) => (
                <div
                  key={relatedBlog._id}
                  className={`group glass-card rounded-2xl overflow-hidden hover:glass-card-hover transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/20 cursor-pointer ${
                    relatedVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                  onClick={() => navigate(`/blog/${relatedBlog._id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedBlog.imgUrl}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="glass-button text-white px-3 py-1 rounded-full text-xs font-medium">
                        {relatedBlog.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors duration-300 line-clamp-2">
                      {relatedBlog.title.length > 20 ? (
                        <>
                          {relatedBlog.title.slice(0, 20)}
                          <span className="font-normal">...</span>
                        </>
                      ) : (
                        relatedBlog.title
                      )}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {relatedBlog.shortDes}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{getTimeAgo(relatedBlog.time)}</span>
                      </div>
                      <div className="flex items-center text-sky-400 group-hover:text-sky-300 transition-colors duration-300">
                        <span className="mr-1">Read</span>
                        <ArrowLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
