// This will be the component that will be used to display the list of applicants
import axios from 'axios';
import React from 'react';
import Nav from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';

function Applicants() {
  const location = useLocation();
  const recruiter = new URLSearchParams(location.search).get('recruiter');
  const position_name = new URLSearchParams(location.search).get(
    'position_name'
  );

  const [applicants, setApplicants] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('http://localhost:8800/api/job/applicants', {
        params: {
          recruiter: recruiter,
          position_name: position_name,
        },
      })
      .then(res => {
        console.log(res.data);
        setApplicants(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundImage:
          'url(https://www.transparenttextures.com/patterns/batthern.png)',
      }}
    >
      <Nav />

      <div
        style={{
          width: '80%',
          alignContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '50px',
          alignItems: 'center',
        }}
      >
        <h2 style={{ alignSelf: 'center' }}>Applicants for {position_name}</h2>
        <div>
          {applicants.length === 0 && (
            <h3 style={{ alignSelf: 'center' }}>No applicants yet</h3>
          )}

          {applicants.map(applicant => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Applicant applicant={applicant} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Applicant = ({ applicant }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        width: '50vw',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black',
        borderRadius: '10px',
        padding: '10px',
        margin: '10px',
        backgroundColor: '#252525',
        color: '#D9D9D9',
      }}
    >
      <img
        src={applicant.profilepic}
        alt={applicant.full_name}
        style={{ width: '80px', height: '80px', borderRadius: '50%' }}
      />
      <div style={{ marginLeft: 20 }}>
        <h3 style={{ color: '#FF3953', fontWeight: '800' }}>
          {applicant.full_name}
        </h3>
        <h4 style={{ color: '#FF3953', fontWeight: '500', fontSize: 20 }}>
          {applicant.email}
        </h4>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: 'auto',

          // marginLeft: "20px",
        }}
      >
        <button
          style={{
            backgroundColor: '#FF3953',
            borderRadius: '10px',
            marginBottom: '10px',
            border: '1px solid #D9D9D9',
            color: '#D9D9D9',
            width: '80%',
            cursor: 'pointer',
            opacity: '1.0',
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={event => {
            event.target.style.opacity = '0.6';
          }}
          onMouseLeave={event => {
            event.target.style.opacity = '1.0';
          }}
          onClick={() => {
            navigate(`/studentrecview/?applicant=${applicant.email}`);
          }}
        >
          View profile
        </button>
        <button
          style={{
            backgroundColor: '#FF3953',
            borderRadius: '10px',
            marginBottom: '10px',
            border: '1px solid #D9D9D9',
            color: '#D9D9D9',
            width: '80%',
            cursor: 'pointer',
            opacity: '1.0',
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={event => {
            event.target.style.opacity = '0.6';
          }}
          onMouseLeave={event => {
            event.target.style.opacity = '1.0';
          }}
        >
          Message
        </button>
        <button
          style={{
            backgroundColor: '#FF3953',
            borderRadius: '10px',
            marginBottom: '10px',
            border: '1px solid #D9D9D9',
            color: '#D9D9D9',
            width: '80%',
            cursor: 'pointer',
            opacity: '1.0',
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={event => {
            event.target.style.opacity = '0.6';
          }}
          onMouseLeave={event => {
            event.target.style.opacity = '1.0';
          }}
        >
          Mark as Reviewed
        </button>
        <button
          style={{
            backgroundColor: '#FF3953',
            borderRadius: '10px',
            marginBottom: '10px',
            border: '1px solid #D9D9D9',
            color: '#D9D9D9',
            width: '80%',
            cursor: 'pointer',
            opacity: '1.0',
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={event => {
            event.target.style.opacity = '0.6';
          }}
          onMouseLeave={event => {
            event.target.style.opacity = '1.0';
          }}
        >
          Schedule Interview
        </button>
        <button
          style={{
            backgroundColor: '#FF3953',
            borderRadius: '10px',
            marginBottom: '10px',
            border: '1px solid #D9D9D9',
            color: '#D9D9D9',
            width: '80%',
            cursor: 'pointer',
            opacity: '1.0',
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={event => {
            event.target.style.opacity = '0.6';
          }}
          onMouseLeave={event => {
            event.target.style.opacity = '1.0';
          }}
        >
          Send Offer Letter
        </button>
      </div>
    </div>
  );
};

export default Applicants;
