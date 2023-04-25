import React from 'react';
import Logo from '../Assets/logo.gif';
// import { FontAwesomeIcon } from '@fortawesome/free-solid-svg-icons';

function LandingPage() {
  return (
    <div style={{ backgroundColor: '#f8f8f8' }}>
      <header style={{ backgroundColor: '#242424', padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // maxWidth: '850px',
            // margin: '0 auto',
          }}
        >
          {/* <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            EmployedBulls
          </h1> */}
          <img
            src={Logo}
            alt='EmployedBulls'
            style={{ maxWidth: '12.5%', height: 'auto' }}
          />
        </div>
      </header>
      <section style={{ padding: '80px 0' }}>
        <div
          style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}
        >
          <h1
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
            B<span style={{ color: 'red' }}>U</span>LLS never settle for less,
            and neither do we
          </h1>
          <h2
            style={{ fontSize: '1.5rem', color: '#333', marginBottom: '50px' }}
          >
            Join the Bulls revolution: Empowering students, Connecting
            recruiters
          </h2>
          {/* <FontAwesomeIcon icon={faUsers} beat /> */}
          <a
            href='/registration'
            style={{
              backgroundColor: '#333',
              color: '#fff',
              padding: '15px 30px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1.2rem',
            }}
          >
            Get Started
          </a>
        </div>
      </section>
      <section style={{ backgroundColor: '#fff', padding: '80px 0' }}>
        <div
          style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}
        >
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '50px',
            }}
          >
            Our Features
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, marginRight: '20px' }}>
              <i
                className='fa fa-users'
                style={{
                  fontSize: '3rem',
                  color: '#333',
                  marginBottom: '20px',
                }}
              ></i>
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                }}
              >
                Search Jobs
              </h3>
              <p style={{ color: '#666' }}>
                Find job postings that are right for you and apply to them
                immediately.
              </p>
            </div>
            <div style={{ flex: 1, marginRight: '20px' }}>
              <i
                className='fa fa-file-text'
                style={{
                  fontSize: '3rem',
                  color: '#333',
                  marginBottom: '20px',
                }}
              ></i>
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                }}
              >
                Upload Resume
              </h3>
              <p style={{ color: '#666' }}>
                Upload your resume and let employers find you{' '}
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <i
                className='fa fa-comments'
                style={{
                  fontSize: '3rem',
                  color: '#333',
                  marginBottom: '20px',
                }}
              ></i>
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                }}
              >
                Connect with Employers
              </h3>
              <p style={{ color: '#666' }}>
                Get in touch with the companies you want to work for and
                schedule interviews.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer
        style={{ backgroundColor: '#333', color: '#fff', padding: '20px' }}
      >
        <div
          style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}
        >
          <p style={{ fontSize: '1.2rem' }}>
            © 2023 EmployedBulls. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
export default LandingPage;
