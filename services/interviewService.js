// services/interviewService.js (Frontend)

// const BASE_URL = "http://localhost:3000"; // Backend base URL

/**
 * Starts a new interview session
 * @param {string} position - Job position being interviewed for
 * @param {string[]} keywords - Array of relevant skills/keywords
 * @returns {Promise<{sessionId: string, firstQuestion: string}>}
 */
export const startInterviewSession = async (position, keywords) => {
  const response = await fetch(`https://ai-interviewer-backend-w42e.onrender.com/start-interview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ position, keywords }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to start interview session");
  }

  return await response.json();
};

/**
 * Submits an answer for evaluation
 * @param {string} sessionId - Interview session ID
 * @param {string} answer - User's answer to the current question
 * @returns {Promise<{
 *   evaluation: {
 *     score: number,
 *     rating: string,
 *     feedback: string,
 *     followUp: string
 *   },
 *   nextQuestion?: string,
 *   isComplete: boolean
 * }>}
 */
export const evaluateAnswer = async (sessionId, answer) => {
  const response = await fetch(`https://ai-interviewer-backend-w42e.onrender.com/start-interview/evaluate-answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ sessionId, answer }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to evaluate answer");
  }

  return await response.json();
};

/**
 * Generates initial interview questions (if needed separately)
 * @param {string} position - Job position
 * @param {string[]} keywords - Relevant skills
 * @param {number} [numQuestions=5] - Number of questions
 * @returns {Promise<string[]>} - Array of questions
 */
export const generateInterviewQuestions = async (position, keywords, numQuestions = 5) => {
  const response = await fetch(`https://ai-interviewer-backend-w42e.onrender.com/start-interview/generate-questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ position, keywords, numQuestions }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to generate questions");
  }

  const data = await response.json();
  return data.questions;
};

export default {
  startInterviewSession,
  evaluateAnswer,
  generateInterviewQuestions,
};