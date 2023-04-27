import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import './Recruitstyle.css';
export default function RecruiterReg() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    company: '',
    phone: '',
  });
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    company: Yup.string().required('Company name is required'),
    phone: Yup.string().required('Phone number is required'),
  });
  function handleSubmit(values, { setSubmitting, resetForm }) {
    console.log('form values: ', values);
    setSubmitting(false);
    resetForm();
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
        backgroundImage:
          'url(https://www.transparenttextures.com/patterns/batthern.png)',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#FF3953', height: '20px' }}>
        Recruiter Application Page
      </h1>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form
            style={{
              height: '70vh',
              width: '30%',
              backgroundColor: '#252525',
              color: '#D9D9D9 ',
              borderRadius: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block' }}>First Name:</label>
              <Field
                type='text'
                name='firstName'
                placeholder='First name'
                style={{ width: '100%', padding: '10px' }}
              />
              <ErrorMessage
                name='firstName'
                component='div'
                style={{ color: 'red', fontSize: '14px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block' }}>Last Name:</label>
              <Field
                type='text'
                name='lastName'
                placeholder='Last name'
                style={{ width: '100%', padding: '10px' }}
              />
              <ErrorMessage
                name='lastName'
                component='div'
                style={{ color: 'red', fontSize: '14px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block' }}>Email:</label>
              <Field
                type='email'
                name='email'
                placeholder='Email'
                style={{ width: '100%', padding: '10px' }}
              />
              <ErrorMessage
                name='email'
                component='div'
                style={{ color: 'red', fontSize: '14px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block' }}>Password:</label>
              <Field
                type='password'
                name='password'
                placeholder='Password'
                style={{ width: '100%', padding: '10px' }}
              />
              <ErrorMessage
                name='password'
                component='div'
                style={{ color: 'red', fontSize: '14px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block' }}>Company name:</label>
              <Field
                type='text'
                name='company'
                placeholder='Company name'
                style={{ width: '100%', padding: '10px' }}
              />
              <ErrorMessage
                name='company'
                component='div'
                style={{ color: 'red', fontSize: '14px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block' }}>Phone:</label>
              <Field
                type='text'
                name='phone'
                placeholder='Phone'
                style={{ width: '100%', padding: '10px' }}
              />
              <ErrorMessage
                name='phone'
                component='div'
                style={{ color: 'red', fontSize: '14px' }}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                type='submit'
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#FF3953',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                disabled={isSubmitting}
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
