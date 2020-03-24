import * as actions from './actionTypes';

//Add a todo

export const addTodo = data => async (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.ADD_TODO_START });

  try {
    const res = await firestore
      .collection('todos')
      .doc(userId)
      .get();

    const newToDo = {
      id: new Date().valueOf(),
      todos: data.todo
    };

    firestore
      .collection('todos')
      .doc(userId)
      .update({
        todos: [...res.data().todos, newToDo]
      });

    dispatch({ type: actions.ADD_TODO_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message });
  }
};
