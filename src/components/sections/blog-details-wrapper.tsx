import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogDetailsPage from "./blog-details";

type BlogPost = {
  _id: string;
  title: string;
  imgUrl: string;
  des: string;
  markdown?: string;
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

export default function BlogDetailsWrapper() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchAllBlogs(id);
    }
  }, [id]);

  const fetchAllBlogs = async (blogId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/blog`);
      if (response.ok) {
        const result = await response.json();
        setAllBlogs(result);

        // Find the specific blog from the array
        const foundBlog = result.find((blog: BlogPost) => blog._id === blogId);
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        id="blog-detail-page"
        className="min-h-screen flex items-center justify-center bg-background px-4"
      >
        <div className="glass-card rounded-2xl p-8 flex items-center space-x-4 shadow-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
          <p className="text-foreground text-lg">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div
        id="blog-detail-page"
        className="min-h-screen flex items-center justify-center bg-background px-4"
      >
        <div className="glass-card rounded-2xl p-8 text-center max-w-md shadow-lg">
          <h2 className="text-2xl font-bold text-foreground mb-4">Blog Not Found</h2>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="glass-button px-6 py-3 rounded-full text-foreground hover:scale-105 transition-all duration-300"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return <BlogDetailsPage blog={blog} allBlogs={allBlogs} />;
}
