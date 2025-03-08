import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="h-screen w-full bg-[#0F0F11] flex flex-col items-center justify-center space-y-6">
      {/* Logo and Header */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="h-8 w-32 bg-gray-700 rounded-md"
      ></motion.div>

      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
        className="h-10 w-2/3 bg-gray-600 rounded-md"
      ></motion.div>

      {/* Subheading */}
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
        className="h-5 w-1/2 bg-gray-700 rounded-md"
      ></motion.div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="h-10 w-32 bg-gray-700 rounded-md"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="h-10 w-32 bg-gray-700 rounded-md"
        ></motion.div>
      </div>

      {/* Course Cards */}
      <div className="flex space-x-6 mt-6">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="h-40 w-56 bg-gray-800 rounded-lg"
          ></motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
