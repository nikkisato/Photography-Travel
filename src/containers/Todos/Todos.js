import React from 'react';
import styled from 'styled-components';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Heading from '../../components/UI/Heading/Heading';
import Todo from './Todo/Todo';
import { Container } from '../../hoc/layouts/elements';
import AddToDo from './AddToDo.js/AddToDo';
import Loader from '../../components/UI/Loader/Loader';

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;
const Todos = ({ requesting, todos, requested, userId }) => {
  let content;

  if (!todos) {
    content = (
      <Content>
        <Loader isWhite />
      </Content>
    );
  } else if (todos[userId] && requested[`todos/${userId}`]) {
    content = (
      <Content>
        <Heading size='h2' color='white'>
          You have no todos!
        </Heading>
      </Content>
    );
  } else {
    content = todos[userId].todos.map(todo => (
      <Todo key={todo.id} todo={todo} />
    ));
  }

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
          {content}
          <Todo />
        </InnerWrapper>
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  todos: firestore.data.todos,
  requesting: firestore.status.requesting,
  requested: firestore.status.requested
});

// const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [`todos/${props.userId}`])
)(Todos);
