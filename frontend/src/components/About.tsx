

import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router";

function About() {
    const navigate = useNavigate();
    const location = useLocation()

    const goBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Hero Intro */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 md:px-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
        >
          Welcome to BlogNest
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl"
        >
          BlogNest is your home for storytelling, writing, and sharing. We are dedicated to empowering writers of all levels with tools and a community to inspire and publish confidently.
        </motion.p>
      </section>

      {/* Values & Mission */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16 py-16">
        {[
          {
            title: "Our Mission",
            desc: "To create a nurturing space for diverse voices and vibrant content. We believe every story matters."
          },
          {
            title: "Our Vision",
            desc: "To build a thriving, inclusive writing community where creativity meets connection."
          },
          {
            title: "What We Offer",
            desc: "Writing tools, editorial support, discoverable blogs, and growth opportunities."
          }
        ].map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="flex flex-col items-center justify-center py-16 px-6 md:px-16">
  <motion.div 
    className="flex flex-col sm:flex-row items-center gap-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <motion.button
      whileHover={{ scale: 1.05 }}
      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg rounded-full shadow-xl transition"
      onClick={goBack}
    >
      ← Go Back
    </motion.button>
  </motion.div>
</section>

    </div>
  );
}

export default About;
