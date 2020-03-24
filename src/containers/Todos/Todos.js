import React from 'react';
import styled from 'styled-components';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Heading from '../../components/UI/Heading/Heading';
import Todo from './Todo/Todo';
import { Container } from '../../hoc/layouts/elements';
import AddToDo from './AddToDo.js/AddToDo';

const Wrapper = styled.div`
  width: 100%;
  align-self: flex-start;
  background-color: var(--color-mainLight);
  height: 100%;
  min-height: calc(100vh - 6rem);
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 4rem;
`;

const Todos = () => {
  return (
    <Wrapper>
      <Container>
        <InnerWrapper>
          <Heading noMargin size='h1' color='white'>
            YOUR TODOS
          </Heading>
          <Heading size='h4' color='white'>
            All you have to do now....
          </Heading>
          <AddToDo />

          <Todo />
        </InnerWrapper>
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  todos: firestore.data.todos
});

const mapDispatchToProps = {};

export default compose(
  connect(mapDispatchToProps, mapStateToProps),
  firestoreConnect(props => [`todos/${props.userId}`])
)(Todos);
