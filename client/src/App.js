import Login from './Pages/Login';
import RecruiterReg from './Pages/RecruiterSide/RecruiReg/RecruiterReg';
import Registration from './Pages/Registration';
import RecruiterJobFeed from './Pages/RecruiterSide/RecruiReg/RecruiterJobFeed';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import StudentAppForm from './Pages/StudentSide/StudentAppForm';
import JobPage from './Pages/RecruiterSide/RecruiReg/JobPage';

function App() {
  return (
    <div className='body'>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/recruiter-reg' element={<RecruiterReg />} />
          <Route path='/student-reg' element={<StudentAppForm />} />
          <Route path='/recJobFeed' element={<RecruiterJobFeed />} />
          <Route path='/jobPageRec/:id' element={<JobPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
