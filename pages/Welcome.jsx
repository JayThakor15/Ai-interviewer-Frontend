import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Laptop, Bot, Sparkles, CheckCircle, Star, ChevronRight } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute rounded-full bg-blue-200/30 w-64 h-64 left-[10%] top-[15%]"
          animate={{
            y: [20, -20, 20],
            x: [-10, 10, -10],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute rounded-full bg-purple-200/20 w-96 h-96 left-[70%] top-[80%]"
          animate={{
            y: [20, -20, 20],
            x: [-10, 10, -10],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute rounded-full bg-indigo-200/25 w-80 h-80 left-[45%] top-[30%]"
          animate={{
            y: [20, -20, 20],
            x: [-10, 10, -10],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute rounded-full bg-pink-200/15 w-72 h-72 left-[85%] top-[60%]"
          animate={{
            y: [20, -20, 20],
            x: [-10, 10, -10],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute rounded-full bg-teal-200/20 w-48 h-48 left-[15%] top-[70%]"
          animate={{
            y: [20, -20, 20],
            x: [-10, 10, -10],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute rounded-full bg-yellow-200/10 w-56 h-56 left-[60%] top-[40%]"
          animate={{
            y: [20, -20, 20],
            x: [-10, 10, -10],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Floating AI Bot Models */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-[25%] left-4 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 z-10"
      >
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-200 rounded-full blur-lg opacity-50"></div>
          <div className="relative bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-2xl shadow-xl border border-blue-200 hover:shadow-blue-300/60 transition-shadow duration-300">
            <Bot className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto" />
            <p className="text-center mt-2 text-xs sm:text-sm font-medium text-blue-800">AI Interviewer</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-[20%] right-8 sm:right-16 w-32 h-32 sm:w-40 sm:h-40 z-20"
      >
        <div className="relative">
          <div className="absolute -inset-4 bg-purple-200 rounded-full blur-lg opacity-50"></div>
          <div className="relative bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-2xl shadow-xl border border-purple-200 hover:shadow-purple-300/60 transition-shadow duration-300">
            <Laptop className="w-16 h-16 sm:w-20 sm:h-20 text-purple-600 mx-auto" />
            <p className="text-center mt-2 text-xs sm:text-sm font-medium text-purple-800">Smart Analysis</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-[35%] right-6 sm:right-24 w-24 h-24 sm:w-32 sm:h-32 z-10"
      >
        <div className="relative top-30">
          <div className="absolute -inset-4 bg-teal-200 rounded-full blur-lg opacity-50"></div>
          <div className="relative bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-2xl shadow-xl border border-teal-200 hover:shadow-teal-300/60 transition-shadow duration-300">
            <Star className="w-12 h-12 sm:w-16 sm:h-16 text-teal-600 mx-auto" />
            <p className="text-center mt-2 text-xs sm:text-sm font-medium text-teal-800">Expert Tips</p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 pt-8 pb-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl sm:max-w-4xl mx-auto text-center mb-8"
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
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 sm:p-3 rounded-full shadow-lg">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
            >
              AI Interview Coach
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-gray-600 max-w-xl sm:max-w-2xl mx-auto mb-4"
          >
            Practice with our AI and ace your next job interview
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3 mt-2"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <CheckCircle className="w-4 h-4 mr-1" /> Personalized Feedback
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              <CheckCircle className="w-4 h-4 mr-1" /> Industry-specific Questions
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
              <CheckCircle className="w-4 h-4 mr-1" /> Resume Analysis
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden max-w-xl sm:max-w-4xl mx-auto mt-6 border border-indigo-100/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left Side - Illustration */}
            <div className="p-6 sm:p-8 md:p-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full opacity-30">
                <div className="absolute top-5 left-5 w-20 h-20 rounded-full bg-blue-200/50"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-200/50"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-indigo-200/50"></div>
              </div>
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
                  className="w-40 sm:w-48 md:w-56 mx-auto"
                />
              </motion.div>
            </div>

            {/* Right Side - Content */}
            <div className="p-6 sm:p-8 md:p-12 relative">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-indigo-100 to-blue-100 transform rotate-45 translate-x-6 -translate-y-6"></div>
              </div>
              <motion.h2
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 mb-4"
              >
                Ready to practice?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base"
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
                  className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center justify-center">
                    Get Started Now
                    <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Feature highlights section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="max-w-4xl mx-auto mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-50 overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-8">
              Why Choose Our AI Interview Coach?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="bg-blue-50/50 p-5 rounded-xl border border-blue-100"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-center text-blue-800 mb-2">Realistic Interviews</h4>
                <p className="text-sm text-center text-gray-600">Experience industry-specific interview questions tailored to your resume.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="bg-purple-50/50 p-5 rounded-xl border border-purple-100"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Laptop className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-center text-purple-800 mb-2">Detailed Feedback</h4>
                <p className="text-sm text-center text-gray-600">Get personalized feedback on your answers to improve your interview skills.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="bg-teal-50/50 p-5 rounded-xl border border-teal-100"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Star className="w-6 h-6 text-teal-600" />
                </div>
                <h4 className="text-lg font-semibold text-center text-teal-800 mb-2">Expert Tips</h4>
                <p className="text-sm text-center text-gray-600">Learn from AI-powered suggestions to improve your interview performance.</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}