import Login from "./Pages/Login";
import Job from "./Pages/StudentSide/Job"
import Registration from "./Pages/Registration";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div className="body">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/job" element={<Job />} />
          <Route path="/"/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
