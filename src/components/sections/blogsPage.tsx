import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight, Search, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared";

type BlogPost = {
  _id: string;
  title: string;
  imgUrl: string;
  des: string;
  category: string;
  time: string;
  shortDes: string;
  featured?: boolean;
  no: number;
  loves?: number;
  likes?: number;
  comments?: unknown[];
};

type SortOption = "recent" | "popular" | "alphabetical";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Most Recent" },
  { value: "popular", label: "Most Popular" },
  { value: "alphabetical", label: "Alphabetical" },
];

export default function BlogsPage() {
  const navigate = useNavigate();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/blog`);
        const result = await response.json();

        setAllBlogs(result);
        setFilteredBlogs(result);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    let filtered = allBlogs;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.shortDes.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort (frontend-only, no server call)
    const popularity = (blog: BlogPost) =>
      (blog.loves || 0) + (blog.likes || 0) + (blog.comments?.length || 0);

    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return popularity(b) - popularity(a);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "recent":
        default:
          return new Date(b.time).getTime() - new Date(a.time).getTime();
      }
    });

    setFilteredBlogs(filtered);
  }, [allBlogs, selectedCategory, searchQuery, sortBy]);

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffWeeks === 1) return "1 week ago";
    if (diffDays < 30) return `${diffWeeks} weeks ago`;
    if (diffMonths === 1) return "1 month ago";
    if (diffDays < 365) return `${diffMonths} months ago`;
    if (diffYears === 1) return "1 year ago";
    return `${diffYears} years ago`;
  };

  return (
    <div id="blogs-list-page" className="min-h-screen relative bg-background">
      {/* Back Button */}
      <div className="container mx-auto max-w-4/5 relative z-10 pt-30">
        {/* Back button */}
        <Link to="/">
          <Button
            variant="ghost"
            className=" mb-7 glass-card text-white hover:text-cyan-300 rounded-full transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        {/* Header */}
        <div
          ref={headerRef as any}
          className={`mb-12 transition-all duration-1000 text-center ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <SectionTitle
            title="All Blogs"
            desc="Dive into my collection of articles covering web development, programming insights, and tech innovations."
          />
        </div>
      </div>
      {/* Blogs Grid */}
      <section className="pb-20 px-4">
        <div
          ref={gridRef as any}
          className={`container mx-auto max-w-6xl transition-all duration-1000 delay-300 ${
            gridVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Sort / Filter bar */}
          {!isLoading && allBlogs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-3 mb-10"
            >
              {sortOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  whileTap={{ scale: 0.94 }}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-300 ${
                    sortBy === option.value
                      ? "text-white"
                      : "glass-button text-slate-600 dark:text-gray-300 hover:text-cyan-300"
                  }`}
                >
                  {sortBy === option.value && (
                    <motion.span
                      layoutId="activeSortPill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-cyan-500/30 border border-cyan-500/40 shadow-[0_4px_16px_rgba(8,145,178,0.3)]"
                    />
                  )}
                  <span className="relative z-10">{option.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-700 rounded mb-3"></div>
                    <div className="h-3 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded mb-4 w-2/3"></div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-gray-700 rounded w-20"></div>
                      <div className="h-3 bg-gray-700 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No blogs found
              </h3>
              <p className="text-gray-400 mb-8">
                {searchQuery || selectedCategory !== "All"
                  ? "Try adjusting your search or filter criteria"
                  : "No blogs are available at the moment"}
              </p>
              {(searchQuery || selectedCategory !== "All") && (
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="glass-button px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <motion.div
                  key={`${sortBy}-${blog._id}`}
                  initial={{ opacity: 0, y: 32, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 1 * 0.07,
                  }}
                  whileHover={{ scale: 1.03 }}
                  className="group glass-card rounded-2xl overflow-hidden hover:glass-card-hover transition-shadow duration-500 hover:shadow-2xl hover:shadow-sky-500/20 cursor-pointer flex flex-col"
                  onClick={() => navigate(`/blog/${blog._id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.imgUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Category and Featured Badge */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="glass-button text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        {blog.category}
                      </span>
                      {blog.featured && (
                        <span className="glass-button text-yellow-300 px-3 py-1 rounded-full text-xs font-medium">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
                      {blog.shortDes.length > 145
                        ? `${blog.shortDes.slice(0, 145)}...`
                        : blog.shortDes}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-400 mt-auto">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{getTimeAgo(blog.time)}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sky-400 group-hover:text-sky-300 transition-colors duration-300">
                        <span className="mr-1">Read</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
