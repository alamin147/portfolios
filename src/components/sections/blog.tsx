import { useEffect, useState } from "react";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SectionTitle } from "@/components/shared";
import { Button } from "@/components/ui/button";

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
};

export default function Blog() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: featuredRef, isVisible: featuredVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const [allBlog, setAllBlog] = useState<BlogPost[]>([]);
  const [featuredBlog, setFeaturedBlog]: any = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/blog`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setAllBlog(result);
        if (result.length === 0) return;
        const featured = result.find((blog: BlogPost) => blog.featured);
        setFeaturedBlog(featured);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffWeeks === 1) return "1 week ago";
    if (diffDays < 30) return `${diffWeeks} weeks ago`;
    if (diffMonths === 1) return "1 month ago";
    return `${diffMonths} months ago`;
  };

  return (
    <section id="blogs" className="py-12 sm:py-16 md:py-20 px-2 sm:px-4 lg:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div
          ref={headerRef as any}
          className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <SectionTitle
            title="Blogs"
            desc="Dive into the articles where I share knowledge, experiences, and the latest trends in the industry."
          />
        </div>

        {/* Featured Article */}
        {
          <div
            ref={featuredRef as any}
            className={`mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 delay-300 ${
              featuredVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden hover:glass-card-hover transition-all duration-500 group hover:shadow-sky-500/20 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-40 sm:h-64 lg:h-[30rem] overflow-hidden">
                  <img
                    src={featuredBlog?.imgUrl || "/placeholder.svg"}
                    alt={featuredBlog?.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                  <div className="absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6">
                    <span className="glass-button text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                      ⭐ Featured
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-6 lg:p-8 xl:p-12 flex flex-col justify-center">
                  <div className="mb-3 sm:mb-4">
                    <span className="glass-button text-sky-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {featuredBlog?.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4 group-hover:text-sky-300 transition-colors duration-300 line-clamp-3">
                    {featuredBlog?.title}
                  </h3>

                  <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed line-clamp-4">
                    {featuredBlog?.shortDes}
                  </p>

                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {formatDate(featuredBlog?.time)}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      if (featuredBlog?._id) {
                        navigate(`/blog/${featuredBlog._id}`);
                      }
                    }}
                    className="cursor-pointer flex items-center justify-center gap-2 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 rounded-full text-white text-sm sm:text-base lg:text-lg font-semibold bg-cyan-500/20 border border-white/10 backdrop-blur-xl shadow-[0_4px_16px_rgba(8,145,178,0.25)] transition-all duration-200 hover:bg-cyan-500/30 hover:shadow-[0_10px_25px_rgba(8,145,178,0.4)] hover:scale-105"
                  >
                    Read Full Article
                    <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        }

        {/* Blog Grid */}
        <div
          ref={gridRef as any}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 transition-all duration-1000 delay-500 ${
            gridVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {allBlog
            ?.filter((blog) => !blog.featured)
            .sort((a, b) => a.no - b.no)
            .slice(0, 3)
            .map((blog) => (
              <div
                key={blog._id}
                className="group glass-card rounded-xl sm:rounded-2xl overflow-hidden hover:glass-card-hover transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/20 cursor-pointer flex flex-col"
                style={{
                  transitionDelay: gridVisible ? `${100}ms` : "0ms",
                }}
                onClick={() => {
                  if (blog._id) {
                    navigate(`/blog/${blog._id}`);
                  }
                }}
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={blog.imgUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover aspect-[16/9] group-hover:scale-110 transition-transform duration-500 bg-gray-800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className="glass-button text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-sky-300 transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 flex-1">
                    {blog.shortDes.length > 145 ? `${blog.shortDes.slice(0, 145)}...` : blog.shortDes}
                  </p>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400 mt-auto">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span>{getTimeAgo(blog.time)}</span>
                    </div>
                    <div className="flex items-center text-sky-400 group-hover:text-sky-300 transition-colors duration-300">
                      <span className="mr-1">Read</span>
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* View All Blogs Button */}
        {allBlog?.filter((blog) => !blog.featured).sort((a, b) => a.no - b.no).length > 3 && (
          <div className="text-center mt-8 sm:mt-12">
             <Button
              onClick={() => navigate("/blogs")}
            className="cursor-pointer gap-2 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 rounded-full text-white text-sm sm:text-base lg:text-lg font-semibold bg-cyan-500/20 border border-white/10 backdrop-blur-xl shadow-[0_4px_16px_rgba(8,145,178,0.25)] transition-all duration-300 hover:bg-cyan-500/30 hover:shadow-[0_10px_25px_rgba(8,145,178,0.4)] hover:scale-105"
          >
             View All Blogs
              <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          </div>
        )}
      </div>
    </section>
  );
}
