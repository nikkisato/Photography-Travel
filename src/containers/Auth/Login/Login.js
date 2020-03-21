import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormWrapper, StyledForm } from '../../../hoc/layouts/elements';
import Input from '../../../components/UI/Forms/Input/Input';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.'),
  password: Yup.string().required('The password is required')
});

const Login = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <h1>Login here...</h1>
          <StyledForm>
            <Field
              type='email'
              name='email'
              placeholder='Your email...'
              component={Input}
            />
            <ErrorMessage name='email'></ErrorMessage>

            <Field
              type='password'
              name='password'
              placeholder='Your password...'
              component={Input}
            />
            <ErrorMessage name='password'></ErrorMessage>
            <button type='submit'>Submit</button>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default Login;
