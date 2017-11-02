'use strict';

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// component
import Todo from './components/Todo';

function reducer(state = { todos: [] }, action) {
  switch(action.type) {
    case 'TODOS_LOADED':
      return Object.assign({}, state, { todos: action.data });
    case 'TOGGLE_LOADING':
      return Object.assign({}, state, { isLoading: action.data });
    case 'TODO_ADDED':
      return Object.assign({}, state, { todos: state.todos.concat(action.data) });
    case 'TEXT_EXISTS':
      return Object.assign({}, state, { isText: action.data });
    default:
      return state;
  }
}

const reduxStore = createStore(
  reducer,
  applyMiddleware(thunk)
);

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={ reduxStore }>
      <Todo />
    </Provider>,
    document.getElementById('app')
  );
});