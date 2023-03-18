import Login from "./Pages/Login";
import RecruiterReg from "./Pages/RecruiterSide/RecruiReg/RecruiterReg";
import Registration from "./Pages/Registration";
import RecruiterJobFeed from "./Pages/RecruiterSide/RecruiReg/RecruiterJobFeed";
import StudentAppForm from "./Pages/StudentSide/StudentAppForm";
import JobPage from "./Pages/RecruiterSide/RecruiReg/JobPage";
import Dashboard from "./Pages/RecruiterSide/RecruiReg/Dashboard";
import JobAdded from "./Pages/RecruiterSide/Dashboard Components/JobAdded";
import InboxWithStudentMessages from "./Pages/RecruiterSide/Dashboard Components/InboxWithStudentMessages";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Chat from "./Pages/StudentSide/Chat";

function App() {
  return (
    <div className="body">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/recruiter-reg" element={<RecruiterReg />} />
          <Route path="/student-reg" element={<StudentAppForm />} />
          <Route path="/recJobFeed" element={<RecruiterJobFeed />} />
          <Route path="/jobPageRec/:id" element={<JobPage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/JobAdded" element={<JobAdded />} />
          <Route path="/InboxRec" element={<InboxWithStudentMessages />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
