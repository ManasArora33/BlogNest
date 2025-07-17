import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router";

const Landing = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-20 bg-transparent backdrop-blur-sm px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-extrabold">
          BlogNest
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {["Home", "About", "Blogs"].map((link) => {
  const path = link === "Home" ? "/dashboard" : `/${link.toLowerCase()}`;
  return (
    <NavLink
      key={link}
      to={path}
      end={link === "Home"}  // ensure exact matching for Dashboard
      className={({ isActive }) =>
        `relative px-2 py-1 font-medium transition ${
          isActive
            ? "text-white bg-purple-600 rounded-full"
            : "text-gray-200 hover:text-white"
        }`
      }
    >
      <span className="relative">{link}</span>
    </NavLink>
  );
})}
          <button
            className="px-4 py-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
        <button 
          className="md:hidden p-2 rounded bg-gray-800 hover:bg-gray-700 transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <XMarkIcon className="h-6 w-6"/> : <Bars3Icon className="h-6 w-6"/>}
        </button>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-black bg-opacity-90 flex flex-col items-center py-4 space-y-4 md:hidden"
          >
            {["Home", "About", "Blogs"].map((link) => {
  const to = link === "Home" ? "/dashboard" : `/${link.toLowerCase()}`;
  return (
    <NavLink
      key={link}
      to={to}
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `w-full text-center text-lg py-2 rounded-lg transition ${
          isActive
            ? "text-white bg-purple-600"
            : "text-white hover:text-purple-300"
        }`
      }
    >
      {link}
    </NavLink>
  );
})}
            <button
              className="px-6 py-2 bg-purple-500 rounded-full hover:bg-purple-600 transition"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center h-screen overflow-hidden pt-16">
        {/* Animated dot grid */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-4 animate-float opacity-10">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
          ))}
        </div>
        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 text-center max-w-3xl px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Write. Share. Inspire.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Begin your creative journey: share your voice, explore new perspectives, and join a vibrant writing community.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-8 px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 shadow-xl transition"
            onClick={() => navigate("/signup")}
          >
            Start Reading
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;
