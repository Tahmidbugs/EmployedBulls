import Login from "./Pages/Login";
import RecruiterReg from "./Pages/RecruiterSide/RecruiReg/RecruiterReg";
import Registration from "./Pages/Registration";
import RecruiterJobFeed from "./Pages/RecruiterSide/RecruiReg/RecruiterJobFeed";
import StudentAppForm from "./Pages/StudentSide/StudentAppForm";
import JobPage from "./Pages/RecruiterSide/RecruiReg/JobPage";
import Dashboard from "./Pages/RecruiterSide/RecruiReg/Dashboard";
import JobAdded from "./Pages/RecruiterSide/Dashboard Components/JobAdded";
import InboxWithStudentMessages from "./Pages/RecruiterSide/Dashboard Components/InboxWithStudentMessages";
import StudentDashboard from "./Pages/StudentSide/StudentDashboard";
import StudentProfile from "./Pages/StudentSide/StudentProfile";
import SavedJobs from "./Pages/StudentSide/SavedJobs";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Chat from "./Pages/StudentSide/Chat";

import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { logoutCall } from "./ContextCalls";
import StudentApplications from "./Pages/StudentSide/StudentApplications";
import Job from "./Pages/StudentSide/Job";
import JobFeed from "./Pages/StudentSide/JobFeed";

function App() {
  const { user, dispatch } = useContext(AuthContext);

  console.log("state of app changed, user now is: ", user);
  return (
    <div>
      <Router>
        {/* <button
          style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            position: "absolute",
            left: 20,
            top: 20,
          }}
          onClick={() => logoutCall(dispatch)}
        >
          Logout
        </button> */}
        <Routes>
          <Route
            exact
            path="/"
            element={
              user ? (
                user.isrecruiter ? (
                  user.profilecomplete ? (
                    <Navigate to="/Dashboard" />
                  ) : (
                    <RecruiterReg />
                  )
                ) : user.profilecomplete ? (
                  <Navigate to="/jobfeed" />
                ) : (
                  <StudentAppForm />
                )
              ) : (
                <Registration />
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                user.isrecruiter ? (
                  <Dashboard />
                ) : user.profilecomplete ? (
                  <Navigate to="/jobfeed" />
                ) : (
                  <StudentAppForm />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/registration"
            element={user ? <Navigate to="/" /> : <Registration />}
          />

          <Route path="/recruiter-reg" element={<RecruiterReg />} />
          <Route path="/student-reg" element={<StudentAppForm />} />
          <Route path="/recJobFeed" element={<RecruiterJobFeed />} />
          <Route path="/jobPageRec/:id" element={<JobPage />} />
          <Route
            path="/Dashboard"
            element={user ? <Dashboard /> : <Navigate to="/registration" />}
          />
          <Route path="/JobAdded" element={<JobAdded />} />
          <Route path="/InboxRec" element={<InboxWithStudentMessages />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route
            path="/studentapplications"
            element={<StudentApplications />}
          />
          <Route path="/job" element={<Job />} />
          <Route path="/jobfeed" element={user ? <JobFeed /> : <Login />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/savedjobs" element={<SavedJobs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
