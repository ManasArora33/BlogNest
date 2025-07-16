import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";

interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/blog/${id}`, {
          withCredentials: true,
        });
        setBlog(res.data.blog);
      } catch (error) {
        navigate("/signup");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/blog/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch {
        navigate("/signup");
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const fetchAuthor = async () => {
      if (blog?.authorId) {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/v1/blog/user/${blog.authorId}`,
            { withCredentials: true }
          );
          setAuthor(res.data.user);
        } catch (err) {
          console.error("Failed to fetch author", err);
        }
      }
    };
    fetchAuthor();
  }, [blog]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/blog`,
        {
          id: blog?.id,
          title: editedTitle,
          content: editedContent,
        },
        { withCredentials: true }
      );
      setBlog((prev) =>
        prev ? { ...prev, title: editedTitle, content: editedContent } : null
      );
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/blog/${blog?.id}`, {
        withCredentials: true,
      });
      alert("Blog deleted successfully!");
      navigate("/blogs"); // Redirect to the user's blogs page or dashboard
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete blog. Please try again.");
    }
  };

  const isAuthor = blog?.authorId === user?.id;

  console.log("Author id is ",blog?.authorId)
  console.log("User id is",user?.id)
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse w-full max-w-2xl space-y-6 p-6">
          <div className="h-10 bg-gray-800 rounded w-3/4"></div>
          <div className="h-6 bg-gray-700 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-700 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg">Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800 sticky top-0 bg-black z-10">
        <Link to="/" className="text-4xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            BlogNest
          </span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/blogs" className="text-gray-300 hover:text-white transition">
            All Blogs
          </Link>
          <Link to="/profile">
            <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center">
              <span className="text-white text-lg">
                {user?.name?.[0].toUpperCase()}
              </span>
            </div>
          </Link>
        </div>
      </nav>

      {/* Blog Content */}
      <main className="max-w-6xl mx-auto p-8 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {isEditing ? (
            <>
              <input
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded text-white"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded text-white"
                rows={10}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <div className="flex gap-4">
                <button
                  onClick={handleUpdate}
                  className="px-6 py-2 bg-purple-600 rounded hover:bg-purple-700 transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-600 rounded hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold">{blog.title}</h1>
              <div className="text-gray-300 whitespace-pre-wrap">{blog.content}</div>
<div className="flex gap-x-4">

              {isAuthor && (
                  <div className="mt-6 flex gap-4 items-center">
                  <button
                    onClick={() => {
                        setEditedTitle(blog.title);
                        setEditedContent(blog.content);
                        setIsEditing(true);
                    }}
                    className="px-6 py-2 bg-purple-600 rounded hover:bg-purple-700 transition"
                    >
                    Edit Blog
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-6 py-2 bg-red-600 rounded hover:bg-red-700 transition"
                  >
                    Delete Blog
                  </button>
                </div>
              )}
              <Link to="/dashboard">
                <button className="mt-6 px-6 py-2 bg-gray-700 rounded hover:bg-gray-600 transition">
                  Back to Dashboard
                </button>
              </Link>
              </div>
            </>
          )}
        </div>

        {/* Author Info */}
        <aside className="bg-gray-900 p-6 rounded-lg shadow-md h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold mb-3">
              {author?.name?.[0].toUpperCase() || "?"}
            </div>
            <p className="text-xl font-semibold">{author?.name || "Unknown Author"}</p>
            <p className="text-sm text-gray-400">{author?.email}</p>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            This blog was written by{" "}
            <span className="text-purple-400 font-medium">{author?.name || "Unknown"}</span>.
          </div>
        </aside>
      </main>
    </div>
  );
}

export default BlogPage;
