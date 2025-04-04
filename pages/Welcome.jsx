import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Laptop, Bot, Sparkles } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="max-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden relative">
      {/* Floating AI Bot Models */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-1/4 left-10 w-32 h-32"
      >
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-200 rounded-full blur-lg opacity-30"></div>
          <div className="relative bg-white p-4 rounded-2xl shadow-lg border border-blue-100">
            <Bot className="w-16 h-16 text-blue-600 mx-auto" />
            <p className="text-center mt-2 text-sm font-medium text-blue-800">AI Interviewer</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-1/3 right-12 w-40 h-40"
      >
        <div className="relative">
          <div className="absolute -inset-4 bg-purple-200 rounded-full blur-lg opacity-30"></div>
          <div className="relative bg-white p-5 rounded-2xl shadow-lg border border-purple-100">
            <Laptop className="w-20 h-20 text-purple-600 mx-auto" />
            <p className="text-center mt-2 text-sm font-medium text-purple-800">Smart Analysis</p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-8 pb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-8"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              AI Interview Coach
            </motion.span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Practice with our AI and ace your next job interview
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto -mt-4"
        >
          <div className="grid md:grid-cols-2 gap-0 mb-9">
            {/* Left Side - Illustration */}
            <div className="p-8 md:p-12 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <img 
                  src="/chatBot.png" 
                  alt="AI Interviewer"
                  className="w-full max-w-xs mx-auto"
                />
              </motion.div>
            </div>

            {/* Right Side - Content */}
            <div className="p-8 md:p-12">
              <motion.h2 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="text-3xl font-bold text-gray-800 mb-4"
              >
                Ready to practice?
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="text-gray-600 mb-8"
              >
                Upload your resume and our AI will generate personalized interview questions tailored to your experience.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <button
                  onClick={() => navigate('/upload')}
                  className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center justify-center">
                    Get Started Now
                    <svg 
                      className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-20 w-16 h-16 bg-blue-200 rounded-full opacity-20"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-20 right-20 w-24 h-24 bg-indigo-200 rounded-full opacity-20"
        ></motion.div>
      </div>
    </div>
  );
}