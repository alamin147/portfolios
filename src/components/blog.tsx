import { useEffect, useState } from "react";
import { Clock, X, Calendar, ArrowRight } from "lucide-react";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import SectionTitle from "./section-title";
import { Button } from "./ui/button";

type BlogPost = {
  _id: string;
  title: string;
  imgUrl: string;
  des: string;
  category: string;
  time: string;
  shortDes: string;
  featured?: boolean;
};

export default function Blog() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: featuredRef, isVisible: featuredVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const [allBlog, setAllBlog] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featuredBlog, setFeaturedBlog]: any = useState();

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

  const openModal = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
    document.body.style.overflow = "auto";
  };

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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <section id="blogs" className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-4/5 relative z-10">
        <div
          ref={headerRef as any}
          className={`text-center mb-20 transition-all duration-1000 ${
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
            className={`mb-20 transition-all duration-1000 delay-300 ${
              featuredVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="glass-card rounded-3xl overflow-hidden hover:glass-card-hover transition-all duration-500 group hover:shadow-sky-500/20 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-[30rem] overflow-hidden">
                  <img
                    src={featuredBlog?.imgUrl || "/placeholder.svg"}
                    alt={featuredBlog?.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className="glass-button text-white px-4 py-2 rounded-full text-sm font-medium">
                      ⭐ Featured
                    </span>
                  </div>
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="glass-button text-sky-300 px-3 py-1 rounded-full text-sm font-medium">
                      {featuredBlog?.category}
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-sky-300 transition-colors duration-300">
                    {featuredBlog?.title}
                  </h3>

                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {featuredBlog?.shortDes}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(featuredBlog?.time)}
                      </div>
                    </div>
                  </div>

                  <Button
                    className="cursor-pointer flex items-center justify-center gap-2 px-8 py-6 rounded-full text-white text-lg font-semibold
                bg-cyan-500/20 border border-white/10 backdrop-blur-xl
                    shadow-[0_4px_16px_rgba(8,145,178,0.25)] transition-all duration-200
                     hover:bg-cyan-500/30 hover:shadow-[0_10px_25px_rgba(8,145,178,0.4)] hover:scale-105"
                  >
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        }

        {/* Blog Grid */}
        <div
          ref={gridRef as any}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${
            gridVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {allBlog
            ?.filter((blog) => !blog.featured)
            .map((blog) => (
              <div
                key={blog._id}
                className="group glass-card rounded-2xl overflow-hidden hover:glass-card-hover transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/20 cursor-pointer"
                style={{
                  transitionDelay: gridVisible ? `${100}ms` : "0ms",
                }}
                onClick={() => openModal(blog)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.imgUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover aspect-[16/9] group-hover:scale-110 transition-transform duration-500 bg-gray-800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="glass-button text-white px-3 py-1 rounded-full text-xs font-medium">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {blog.shortDes}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{getTimeAgo(blog.time)}</span>
                    </div>
                    <div className="flex items-center text-sky-400 group-hover:text-sky-300 transition-colors duration-300">
                      <span className="mr-1">Read</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Blog Modal */}
        {isModalOpen && selectedBlog && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div
              className="relative glass-card rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-20 glass-button text-white rounded-full w-12 h-12 flex items-center justify-center hover:scale-105 transition-all duration-300"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="relative h-80 overflow-hidden">
                <img
                  src={selectedBlog.imgUrl || "/placeholder.svg"}
                  alt={selectedBlog.title}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="glass-button text-white px-4 py-2 rounded-full text-sm font-medium">
                      {selectedBlog.category}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-white">
                    {selectedBlog.title}
                  </h1>
                </div>
              </div>

              <div className="flex-1 p-8 overflow-y-auto">
                <div className="flex items-center gap-6 mb-8 text-gray-300 text-sm border-b border-sky-500/20 pb-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(selectedBlog.time)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{getTimeAgo(selectedBlog.time)}</span>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                    {selectedBlog.des}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
