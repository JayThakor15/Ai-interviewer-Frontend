import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "../pages/Welcome";
import ResumeUpload from "../pages/ResumeUpload";
import Interview from "../pages/Interview";
// import Results from "./pages/Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/upload" element={<ResumeUpload />} />
        <Route path="/interview" element={<Interview />} />
        {/* <Route path="/results" element={<Results />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
