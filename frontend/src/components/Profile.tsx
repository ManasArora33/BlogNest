import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api";

interface User {
  name: string;
  email: string;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/v1/blog/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
        navigate("/signup");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    api
      .get("/api/v1/user/signout", { withCredentials: true })
      .then(() => {
        alert("Successfully Logged Out");
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
        alert("Logout failed. Please try again.");
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4 bg-black border-b border-gray-800 space-y-4 md:space-y-0">
        <Link to="/" className="text-3xl md:text-4xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            BlogNest
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard"
            className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300"
          >
            Dashboard
          </Link>
          <Link to="/createBlog">
            <button className="px-4 md:px-5 py-2 text-sm md:text-base text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg">
              Create Blog
            </button>
          </Link>
        </div>
      </nav>

      {/* Profile Content */}
      <main className="p-4 md:p-8 flex justify-center items-start pt-10 md:pt-20">
        <div className="w-full max-w-md bg-gray-900 p-6 md:p-10 rounded-2xl shadow-2xl space-y-6 md:space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl md:text-4xl font-bold shadow-lg">
              {user?.name?.[0].toUpperCase()}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">{user?.name}</h2>
            <p className="text-gray-400 text-sm md:text-base">{user?.email}</p>
          </div>
          <div className="border-t border-gray-700"></div>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full py-3 px-4 text-black font-semibold rounded-lg bg-white hover:bg-gray-200 transition-all duration-300 shadow-lg"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 text-white font-semibold rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
