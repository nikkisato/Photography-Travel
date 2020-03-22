import React from 'react';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { FormWrapper, StyledForm } from '../../../hoc/layouts/elements';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Heading from '../../../components/UI/Heading/Heading';
import * as actions from '../../../store/actions';
import Message from '../../../components/UI/Message/Message';
import styled from 'styled-components';

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Your first name is required.')
    .min(3, 'Too short.')
    .max(25, 'Too long.'),
  lastName: Yup.string()
    .required('Your last name is required.')
    .min(3, 'Too short.')
    .max(25, 'Too long.'),
  email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.'),
  password: Yup.string()
    .required('The password is required.')
    .min(8, 'The password is too short.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], `Password doesn't match`)
    .required('You need to confirm your password.')
});

const SignUp = ({ signUp, loading, error }) => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={SignUpSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await signUp(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Heading size='h1' color='white' noMargin>
            Sign up for an account
          </Heading>
          <Heading bold size='h4' color='white'>
            Fill in your details to register your new account
          </Heading>
          <StyledForm>
            <Field
              type='text'
              name='firstName'
              placeholder='Your first name...'
              component={Input}
            />
            <Field
              type='text'
              name='lastName'
              placeholder='Your last name...'
              component={Input}
            />
            <Field
              type='email'
              name='email'
              placeholder='Your email...'
              component={Input}
            />

            <Field
              type='password'
              name='password'
              placeholder='Your password...'
              component={Input}
            />

            <Field
              type='password'
              name='confirmPassword'
              placeholder='Re-type your password...'
              component={Input}
            />

            <Button
              loading={loading ? 'Signing up...' : null}
              disabled={!isValid || isSubmitting}
              type='submit'
            >
              Sign Up
            </Button>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error
});

const mapDispatchToProps = {
  signUp: actions.signUp
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
