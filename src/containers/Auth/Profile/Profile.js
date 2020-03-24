import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

import { FormWrapper, StyledForm } from '../../../hoc/layouts/elements';
import Message from '../../../components/UI/Message/Message';
import Heading from '../../../components/UI/Heading/Heading';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';

import * as actions from '../../../store/actions';

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  padding: 0 3rem;
`;

const ProfileSchema = Yup.object().shape({
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
  password: Yup.string().min(8, 'The password is too short.'),
  confirmPassword: Yup.string().when('password', {
    is: password => password.length > 0,
    then: Yup.string()
      .required('You need to confirm your password.')
      .oneOf([Yup.ref('password'), null], `Password doesn't match`)
  })
});

const Profile = ({ firebase, editProfile, loading, error, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const [modalOpened, setModalOpened] = useState(false);

  if (!firebase.profile.isLoaded) return null;
  return (
    <>
      <Formik
        initialValues={{
          firstName: firebase.profile.firstName,
          lastName: firebase.profile.lastName,
          email: firebase.auth.email,
          password: '',
          confirmPassword: ''
        }}
        validationSchema={ProfileSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await editProfile(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <FormWrapper>
            <Heading noMargin size='h1' color='white'>
              Edit your profile
            </Heading>
            <Heading bold size='h4' color='white'>
              Here you can edit your profile
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
                disabled={!isValid || isSubmitting}
                loading={loading ? 'Editing...' : null}
                type='submit'
              >
                Edit
              </Button>
              <MessageWrapper>
                <Message error show={error}>
                  {error}
                </Message>
              </MessageWrapper>
              <MessageWrapper>
                <Message success show={error === false}>
                  Profile was updated!
                </Message>
              </MessageWrapper>
              <p onClick={() => setModalOpened(true)}>Delete my account</p>
            </StyledForm>
          </FormWrapper>
        )}
      </Formik>
      <Modal opened={modalOpened} close={() => setModalOpened(false)}>
        This is a modal MWAHAHAHAH
      </Modal>
    </>
  );
};

const mapStateToProps = ({ firebase, auth }) => ({
  firebase,
  loading: auth.profileEdit.loading,
  error: auth.profileEdit.error
});

const mapDispatchToProps = {
  editProfile: actions.editProfile,
  cleanUp: actions.clean
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
