import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Recruitstyle.css';
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
    <div className='form-container'>
      <h1>Recruiter Application Page</h1>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='form-group'>
              <label htmlFor='firstName'>First Name: </label>
              <Field
                type='text'
                name='firstName'
                placeholder='First name'
                className='form-control'
              />
              <ErrorMessage
                name='firstName'
                component='div'
                className='form-error'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>Last Name: </label>
              <Field
                type='text'
                name='lastName'
                placeholder='Last name'
                className='form-control'
              />
              <ErrorMessage
                name='lastName'
                component='div'
                className='form-error'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email: </label>
              <Field
                type='email'
                name='email'
                placeholder='Email'
                className='form-control'
              />
              <ErrorMessage
                name='email'
                component='div'
                className='form-error'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password: </label>
              <Field
                type='password'
                name='password'
                placeholder='Password'
                className='form-control'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='form-error'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='text'>Company name: </label>
              <Field
                type='text'
                name='company'
                placeholder='Company name'
                className='form-control'
              />
              <ErrorMessage
                name='company'
                component='div'
                className='form-error'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='text'>Phone: </label>
              <Field
                type='text'
                name='phone'
                placeholder='Phone'
                className='form-control'
              />
              <ErrorMessage
                name='phone'
                component='div'
                className='form-error'
              />
            </div>
            <div className='form-group'>
              <button
                type='submit'
                className='btn btn-primary'
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
