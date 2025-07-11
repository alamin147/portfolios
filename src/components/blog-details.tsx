import { useEffect, useState } from "react";
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
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { toast } from "react-toastify";
import {
  ShareToast,
  ShareSuccessToast,
  LikeToast,
  UnlikeToast,
} from "./custom-toast";

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
  views?: number;
  likes?: number;
  comments?: number;
};

interface BlogDetailsPageProps {
  blog: BlogPost;
  allBlogs: BlogPost[];
}

export default function BlogDetailsPage({
  blog,
  allBlogs,
}: BlogDetailsPageProps) {
  const navigate = useNavigate();
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isSharing, setIsSharing] = useState(false);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { ref: relatedRef, isVisible: relatedVisible } = useScrollAnimation();

  useEffect(() => {
    // Simply show all other blogs except the current one, maximum 3
    const otherBlogs = allBlogs.filter((b) => b._id !== blog._id).slice(0, 3);

    setRelatedBlogs(otherBlogs);
  }, [blog, allBlogs]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      toast(<UnlikeToast />, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "custom-toast",
      });
    } else {
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
  };

  return (
    <div className="min-h-screen relative">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-cyan-400 transition-all duration-300 reading-progress"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={heroRef as any}
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

      {/* Content Section */}
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
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-sky-500/20">
                <h3 className="text-white text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
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
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        : "glass-button text-gray-300 hover:text-red-400"
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                    />
                    <span>{(blog.likes || 0) + (isLiked ? 1 : 0)}</span>
                  </button>

                  <div className="flex items-center space-x-2 glass-button p-3 rounded-full text-gray-300">
                    <MessageCircle className="h-5 w-5" />
                    <span>{blog.comments || 0}</span>
                  </div>

                  <div className="flex items-center space-x-2 glass-button p-3 rounded-full text-gray-300">
                    <ThumbsUp className="h-5 w-5" />
                    <span>{blog.views || 0}</span>
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

      {/* Related Articles */}
      <section className="py-16 px-4 relative">
        <div
          ref={relatedRef as any}
          className={`container mx-auto max-w-6xl transition-all duration-1000 delay-500 ${
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
              {relatedBlogs.map((relatedBlog, index) => (
                <div
                  key={relatedBlog._id}
                  className="group glass-card rounded-2xl overflow-hidden hover:glass-card-hover transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/20 cursor-pointer"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
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
