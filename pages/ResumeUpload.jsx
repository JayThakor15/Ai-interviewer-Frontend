import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, Briefcase, Play, Sparkles } from "lucide-react";
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
        "http://localhost:3000/upload",  // Updated endpoint
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
        "http://localhost:3000/start-interview", // Correct backend URL
        {
          position: selectedPosition,
          keywords,
        }
      );

      navigate("/interview", {
        state: {
          position: selectedPosition,
          keywords,
          questions: [response.data.firstQuestion],
          sessionId: response.data.sessionId,
        },
      });
    } catch (err) {
      console.error("Error starting interview:", err);
      setError(
        err.response?.data?.error || "Failed to start interview. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Upload Your Resume
              </h1>
              <p className="text-blue-100 mt-1 text-sm">
                Get personalized interview questions based on your experience
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8">
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
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  file
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
                onClick={() => fileInputRef.current?.click()}
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
                <UploadCloud className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600 mb-2 font-medium">
                  {file ? (
                    <span className="text-blue-600">{file.name}</span>
                  ) : (
                    "Click to select or drag your resume here"
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  Supported formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUpload}
                disabled={!file || uploading}
                className={`mt-6 w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
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
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Resume Analyzed Successfully!
                </h2>
                <p className="text-gray-600">
                  We found {keywords.length} key skills in your resume
                </p>
              </div>

              <div className="mb-6 text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Select Target Position
                </label>
                <select
                  value={selectedPosition}
                  onChange={(e) => {
                    setSelectedPosition(e.target.value);
                    setError("");
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Select a position...</option>
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>

              {keywords.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2 text-left">
                    Key Skills Identified:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartInterview}
                disabled={!selectedPosition || isLoading}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 mt-4 transition-all ${
                  !selectedPosition || isLoading
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
                }`}
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