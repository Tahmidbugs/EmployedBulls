import Login from "./Pages/Login";
import RecruiterReg from "./Pages/RecruiterSide/RecruiReg/RecruiterReg";
import Registration from "./Pages/Registration";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StudentAppForm from "./Pages/StudentSide/StudentAppForm";
import JobFeed from "./Pages/StudentSide/JobFeed";
import StudentProfile from "./Pages/StudentSide/StudentProfile";
import RecruiterJobFeed from "./Pages/RecruiterSide/RecruiReg/RecruiterJobFeed";

function App() {
  return (
    <div className="body">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/recruiter-reg" element={<RecruiterReg />} />
          <Route path="/student-reg" element={<StudentAppForm />} />
          <Route path="/jobFeed" element={<JobFeed />} />
          {/* <Route path="/student-reg" element={<StudentAppForm />} /> */}
          <Route path="/student-reg" element={<StudentAppForm />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/recjobfeed" element={<RecruiterJobFeed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
