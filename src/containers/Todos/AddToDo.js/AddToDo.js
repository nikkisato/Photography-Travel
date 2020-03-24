import React, { useState } from 'react';
import styled from 'styled-components';
import * as actions from '../../../store/actions';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { StyledForm } from '../../../hoc/layouts/elements';
import { connect } from 'react-redux';
import Message from '../../../components/UI/Message/Message';
import Heading from '../../../components/UI/Heading/Heading';
import Input from '../../../components/UI/Forms/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';

import Button from '../../../components/UI/Forms/Button/Button';

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0rem;
  width: 100%;
  padding: 0 3rem;
`;

const TodoSchema = Yup.object().shape({
  todo: Yup.string()
    .required('The todo is required')
    .min(4, 'Too short.')
});

const AddToDo = ({ addTodo, error, loading }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      <Button color='main' onClick={() => setIsOpened(true)} contain>
        Add to do
      </Button>

      <Modal opened={isOpened} close={() => setIsOpened(false)}>
        <Heading noMargin size='h1' color='white'>
          Add your new Todo
        </Heading>
        <Heading bold size='h4' color='white'>
          Type your todo and press add!
        </Heading>

        <Formik
          initialValues={{ todos: '' }}
          validationSchema={TodoSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const res = await addTodo(values);
            if (res) {
              setIsOpened(false);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <StyledForm>
              <Field
                type='text'
                name='todo'
                placeholder='Type your Todo...'
                component={Input}
              />

              <ButtonsWrapper>
                <Button
                  contain
                  disabled={!isValid || isSubmitting}
                  color='main'
                  type='submit'
                  loading={loading ? 'Adding To do...' : null}
                >
                  Add to do
                </Button>
                <Button color='main' contain onClick={() => setIsOpened(false)}>
                  Cancel
                </Button>
              </ButtonsWrapper>

              <MessageWrapper>
                <Message error show={error}>
                  {error}
                </Message>
              </MessageWrapper>
            </StyledForm>
          )}
        </Formik>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ todos }) => ({
  loading: todos.loading,
  error: todos.error
});

const mapDispatchToProps = {
  addTodo: actions.addTodo
};

export default connect(null, mapDispatchToProps)(AddToDo);
