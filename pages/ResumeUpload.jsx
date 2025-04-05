import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, Briefcase, Play, Sparkles, CheckCircle, ChevronRight, Star, Laptop } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Scientist",
    "UX/UI Designer",
  ];

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post(
        "https://ai-interviewer-backend-w42e.onrender.com/upload", // Updated endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setKeywords(data.keywords);
      setUploadSuccess(true);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(
        err.response?.data?.error ||
        "Failed to upload resume. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleStartInterview = async () => {
    if (!selectedPosition) {
      setError("Please select a position first");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("Starting interview with position:", selectedPosition);
      console.log("Keywords:", keywords);

      const response = await axios.post(
        "https://ai-interviewer-backend-w42e.onrender.com/start-interview",
        {
          position: selectedPosition,
          keywords,
        }
      );

      console.log("Backend response:", response.data); // Debug log

      if (!response.data?.firstQuestion || !response.data?.sessionId) {
        throw new Error("Invalid response from server");
      }

      navigate("/interview", {
        state: {
          position: selectedPosition,
          keywords,
          questions: [response.data.firstQuestion],
          sessionId: response.data.sessionId,
        },
      });
    } catch (err) {
      console.error("Error starting interview:", err.response?.data || err.message);
      setError(
        err.response?.data?.error || "Failed to start interview. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
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
          className="absolute rounded-full bg-indigo-200/25 w-80 h-80 left-[85%] top-[30%]"
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
      </div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-[15%] left-4 sm:left-10 w-20 h-20 sm:w-24 sm:h-24 z-0"
      >
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-200 rounded-full blur-lg opacity-40"></div>
          <div className="relative bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-blue-100">
            <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-[20%] right-4 sm:right-12 w-20 h-20 sm:w-24 sm:h-24 z-0"
      >
        <div className="relative">
          <div className="absolute -inset-4 bg-purple-200 rounded-full blur-lg opacity-40"></div>
          <div className="relative bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-purple-100">
            <Laptop className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mx-auto" />
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg sm:max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-indigo-100/50 z-10"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 sm:p-6 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3"></div>

          <motion.div
            className="flex items-center gap-3 relative z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="p-2 bg-white/20 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Upload Your Resume
              </h1>
              <p className="text-blue-100 mt-1 text-sm">
                Get personalized interview questions based on your experience
              </p>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 relative">
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-indigo-100 to-blue-100 transform rotate-45 translate-x-6 -translate-y-6"></div>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {!uploadSuccess ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-all relative ${
                  file
                    ? "border-blue-400 bg-blue-50/70 backdrop-blur-sm"
                    : "border-gray-300 hover:border-blue-400 hover:shadow-md"
                }`}
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFile(e.target.files[0]);
                      setError("");
                    }
                  }}
                  className="hidden"
                />
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <UploadCloud className="w-10 sm:w-12 h-10 sm:h-12 text-blue-500 mx-auto mb-4" />
                </motion.div>
                <p className="text-sm sm:text-base text-gray-600 mb-2 font-medium">
                  {file ? (
                    <span className="text-blue-600">{file.name}</span>
                  ) : (
                    "Click to select or drag your resume here"
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  Supported formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUpload}
                disabled={!file || uploading}
                className={`mt-6 w-full py-2 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  !file || uploading
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                }`}
              >
                {uploading ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    Analyze Resume
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </>
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="mb-6">
                <motion.div
                  className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 0.6
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: 3, repeatType: "reverse" }}
                  >
                    <CheckCircle className="w-8 sm:w-10 h-8 sm:h-10 text-green-600" />
                  </motion.div>
                </motion.div>
                <motion.h2
                  className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Resume Analyzed Successfully!
                </motion.h2>
                <motion.p
                  className="text-sm sm:text-base text-gray-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  We found {keywords.length} key skills in your resume
                </motion.p>
              </div>

              <motion.div
                className="mb-6 text-left"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  Select Target Position
                </label>
                <div className="relative">
                  <select
                    value={selectedPosition}
                    onChange={(e) => {
                      setSelectedPosition(e.target.value);
                      setError("");
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-white shadow-sm"
                  >
                    <option value="">Select a position...</option>
                    {positions.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronRight className="w-4 h-4 text-gray-500 rotate-90" />
                  </div>
                </div>
              </motion.div>

              {keywords.length > 0 && (
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-sm font-medium text-gray-700 mb-2 text-left flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500" />
                    Key Skills Identified:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <motion.span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 shadow-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.05, backgroundColor: "#dbeafe" }}
                      >
                        {keyword}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartInterview}
                disabled={!selectedPosition || isLoading}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 mt-4 transition-all ${
                  !selectedPosition || isLoading
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-lg"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Starting...
                  </>
                ) : (
                  <>
                    Start Practice Interview
                    <Play className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}