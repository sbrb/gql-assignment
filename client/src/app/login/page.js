'use client';

import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Container } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import LockIcons from '@/components/icons/LockIcons';
import EyesClose from '@/components/icons/EyesClose';
import EyesOpen from '@/components/icons/EyesOpen';
import { setCookie } from '@/utils/setCookie';
import { signIn } from '@/app/services/index';


const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().matches(/^([a-zA-Z0-9_.]+@[a-z]+\.[a-z]{2,99})?$/, 'Invalid email').required('Email is required.'),
    password: Yup.string().matches(/^(?!\d)[A-Za-z0-9]{4,}$(?=.*[A-Za-z])?$/, 'Use 4 or more Char.').required('Password is required.'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const { email, password } = values;
    try {
      const { userSignin } = await signIn(email, password);
      setCookie('token', userSignin.token, 1);
      toast.success('Login successful');
      setTimeout(() => {
        router.push('/');
      }, 700);
    } catch (error) {
      const errorMessage = error.response?.errors?.[0]?.message || 'Login failed.';
      toast.error(errorMessage);
    }
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className='h-screen-center'>
              <div className='card-from'>
                <div className='card-header'>
                  <div className='lock-icons'>
                    <LockIcons />
                  </div>
                </div>
                <Container maxWidth='xs'>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        name='email'
                        as={TextField}
                        label='Email'
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        fullWidth
                        size='small'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        as={TextField}
                        label='Password'
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        fullWidth
                        size='small'
                        InputProps={{
                          endAdornment: (
                            <div className='icons-password' onClick={() => setShowPassword((prev) => !prev)}>
                              {showPassword ? <EyesOpen /> : <EyesClose />}
                            </div>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type='submit' variant='contained' color='primary' fullWidth>
                        Sign In
                      </Button>
                    </Grid>
                  </Grid>
                </Container>

                <p className='donot-have'>
                  Don't have an account <Link href={'/register'} className='link'>Sign Up ?</Link>
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer position="top-left" />
    </>
  );
};

export default Signin;
