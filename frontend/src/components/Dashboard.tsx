import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

interface User {
  name: string;
  email: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/blog/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        navigate("/signup");
      });
  }, [navigate]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/blog/bulk/all", { withCredentials: true })
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-black border-b border-gray-800 sticky top-0 z-10">
        <Link to="/" className="text-4xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            BlogNest
          </span>
        </Link>
        <div className="flex-1 max-w-md mx-8">
            <input 
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            />
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/blogs" className="text-gray-300 hover:text-white transition-colors duration-300">
            Your Blogs
          </Link>
          <Link to="/createBlog">
            <button className="px-5 py-2 text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg">
              Create Blog
            </button>
          </Link>
          <Link to="/profile">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700 hover:border-purple-500 transition-all duration-300">
              <span className="text-white text-lg font-medium">
                {user?.name?.[0].toUpperCase()}
              </span>
            </div>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          All Blogs
        </h1>

        <div className="space-y-8">
          {loading
            ? Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="bg-gray-900 rounded-lg shadow-lg p-6 animate-pulse">
                  <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                  </div>
                </div>
              ))
            : filteredBlogs.map((b: Blog) => (
                <div
                  key={b.id}
                  className="bg-gray-900 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300 p-6 group cursor-pointer"
                  onClick={() => navigate(`/blog/${b.id}`)}
                >
                  <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                    {b.title}
                  </h3>
                  <p className="text-gray-400 flex-grow line-clamp-2 mb-4">
                    {b.content}
                  </p>
                  <div className="text-right">
                    <span className="text-purple-400 font-semibold">
                      Read more →
                    </span>
                  </div>
                </div>
              ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;