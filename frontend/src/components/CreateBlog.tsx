import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api";

interface User {
  name: string;
  email: string;
}

function CreateBlog() {
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogCreated, setBlogCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/v1/blog/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => navigate("/signup"));
  }, [navigate]);

  const handleCreateBlog = async () => {
    try {
      const response = await api.post(
        "/api/v1/blog",
        { title, content },
        { withCredentials: true }
      );
      setBlogCreated(true);
      const blogId = response.data.blog.id;
      navigate(`/blog/${blogId}`);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4 bg-black border-b border-gray-800 sticky top-0 z-10 space-y-4 md:space-y-0">
        <Link to="/" className="text-3xl md:text-4xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            BlogNest
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="text-sm md:text-base text-gray-300 hover:text-white transition">
            All Blogs
          </Link>
          <Link to="/blogs" className="text-sm md:text-base text-gray-300 hover:text-white transition">
            Your Blogs
          </Link>
          <Link to="/profile">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700 hover:border-purple-500 transition-all duration-300">
              <span className="text-white text-base font-medium">
                {user?.name?.[0].toUpperCase()}
              </span>
            </div>
          </Link>
        </div>
      </nav>

      {/* Create Blog Form */}
      <main className="flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-xl bg-gray-900 p-6 md:p-10 rounded-2xl shadow-xl space-y-6 md:space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white">
            Create a New Blog Post
          </h2>

          <form
            className="space-y-5 md:space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateBlog();
            }}
          >
            {/* Title */}
            <div>
              <input
                type="text"
                required
                placeholder="Blog Title"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Content */}
            <div>
              <textarea
                required
                rows={10}
                placeholder="Write your blog content here..."
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            {blogCreated ? (
              <p className="text-center text-green-500 font-semibold">
                Blog created successfully!
              </p>
            ) : (
              <button
                type="submit"
                className="w-full py-3 text-sm md:text-base text-white font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
              >
                Create Blog
              </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateBlog;
