import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { startInterviewSession, evaluateAnswer } from "../services/interviewService";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const buttonVariants = {
  hover: { scale: 1.03 },
  tap: { scale: 0.98 }
};

export default function Interview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [interview, setInterview] = useState({
    sessionId: null,
    position: "",
    questions: [],
    currentIndex: 0,
    answers: [],
    currentAnswer: "",
    isComplete: false,
    isLoading: false,
    feedback: null,
    evaluation: null
  });

  // Initialize interview session
  useEffect(() => {
    console.log("Interview state:", state);

    if (!state?.position || !state?.keywords?.length) {
      navigate("/", { state: { error: "Missing interview data" } });
      return;
    }

    const initializeInterview = async () => {
      try {
        setInterview((prev) => ({ ...prev, isLoading: true }));

        const { sessionId, firstQuestion } = await startInterviewSession(
          state.position,
          state.keywords
        );

        setInterview((prev) => ({
          ...prev,
          sessionId,
          position: state.position,
          questions: [firstQuestion], // Start with first question
          isLoading: false,
        }));
      } catch (error) {
        navigate("/", { state: { error: "Failed to start interview session" } });
      }
    };

    initializeInterview();
  }, [state, navigate]);

  const handleSubmit = async () => {
    const { sessionId, currentAnswer, currentIndex, questions } = interview;

    if (!currentAnswer.trim() || !sessionId) return;

    setInterview((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await evaluateAnswer(sessionId, currentAnswer.trim());

      const { evaluation, nextQuestion, isComplete } = response;

      // Update questions list if we received a follow-up
      const updatedQuestions = [...questions];
      if (nextQuestion && !isComplete) {
        updatedQuestions.push(nextQuestion);
      }

      setInterview((prev) => ({
        ...prev,
        answers: [
          ...prev.answers,
          {
            question: questions[currentIndex],
            answer: currentAnswer.trim(),
            evaluation,
          },
        ],
        questions: updatedQuestions,
        currentAnswer: "",
        currentIndex: isComplete ? prev.currentIndex : prev.currentIndex + 1,
        isComplete,
        feedback: evaluation.feedback,
        evaluation,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error evaluating answer:", error);
      setInterview((prev) => ({
        ...prev,
        isLoading: false,
        feedback: "Could not evaluate answer at this time. Please try again.",
      }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleSubmit();
    }
  };

  if (interview.isComplete) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-indigo-800 mb-6"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            Interview Complete!
          </motion.h2>
          
          <div className="space-y-6">
            {interview.answers.map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-700">
                      Question {idx + 1}
                    </h3>
                    <p className="mt-2 text-gray-800">{item.question}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.evaluation?.rating === 'Excellent' ? 'bg-green-100 text-green-800' :
                    item.evaluation?.rating === 'Good' ? 'bg-blue-100 text-blue-800' :
                    item.evaluation?.rating === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.evaluation?.rating || 'Not rated'}
                  </span>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800">Your Answer:</h4>
                  <p className="mt-1 text-gray-700">{item.answer}</p>
                </div>
                
                {item.evaluation && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800">Feedback:</h4>
                      <p className="mt-1 text-gray-700">
                        {item.evaluation.feedback}
                      </p>
                    </div>
                    {item.evaluation.followUp && (
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <h4 className="font-medium text-purple-800">Follow-up:</h4>
                        <p className="mt-1 text-gray-700">
                          {item.evaluation.followUp}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Start New Interview
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          className="text-3xl font-bold text-indigo-800 mb-2"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          {interview.position} Interview
        </motion.h1>
        
        <motion.div 
          className="bg-white rounded-xl shadow-md p-6 mb-6"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          key={interview.currentIndex}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-indigo-700">
              Question {interview.currentIndex + 1}
            </h3>
            <div className="h-2 bg-blue-100 rounded-full w-full max-w-xs ml-4">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((interview.currentIndex + 1) / (interview.questions.length + 1)) * 100}%` 
                }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
          
          <motion.p 
            className="text-lg text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {interview.questions[interview.currentIndex]}
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-md p-6 mb-6"
          variants={cardVariants}
        >
          <textarea
            value={interview.currentAnswer}
            onChange={(e) => setInterview(prev => ({
              ...prev,
              currentAnswer: e.target.value
            }))}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={6}
            placeholder="Type your answer here..."
            disabled={interview.isLoading}
            autoFocus
          />
        </motion.div>

        <motion.div className="flex justify-end">
          <motion.button
            onClick={handleSubmit}
            disabled={!interview.currentAnswer.trim() || interview.isLoading}
            className={`px-6 py-3 rounded-lg font-medium text-white shadow-md ${
              interview.isLoading 
                ? 'bg-gray-400' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {interview.isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Submit Answer"
            )}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {(interview.feedback || interview.evaluation) && (
            <motion.div
              className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-indigo-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center mb-3">
                <h4 className="font-medium text-indigo-800 mr-3">Evaluation:</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  interview.evaluation?.rating === 'Excellent' ? 'bg-green-100 text-green-800' :
                  interview.evaluation?.rating === 'Good' ? 'bg-blue-100 text-blue-800' :
                  interview.evaluation?.rating === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {interview.evaluation?.rating || 'Not rated'}
                </span>
              </div>
              
              <div className="space-y-3">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {interview.evaluation?.feedback || interview.feedback}
                </p>
                
                {interview.evaluation?.followUp && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <h5 className="font-medium text-indigo-700">Next up:</h5>
                    <p className="text-gray-700 mt-1">
                      {interview.evaluation.followUp}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}