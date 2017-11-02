'use strict';

import $ from 'jquery';

const url = 'http://localhost:3000/api/todos';

module.exports = {
  loadTodos,
  addTodo,
  textExists,
};

// load todo
function loadTodos() {
  return(dispatch) => {
    dispatch(toggleLoading(true));
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
    }).done((res) => {
      setTimeout(() => {
        dispatch(todosLoaded(res));
        dispatch(toggleLoading(false));
      }, 2000)
    }).fail((xhr, status, err) => {
      dispatch(toggleLoading(false));
      console.log('/api/todos.json', status, err.toString());
    });
  };
}

function todosLoaded(todos) {
  return {
    type: 'TODOS_LOADED',
    data: todos
  };
}

function toggleLoading(isLoading) {
  return {
    type: 'TOGGLE_LOADING',
    data: isLoading
  };
}

// add todo
function addTodo(newTodo) {
  return(dispatch) => {
    dispatch(toggleLoading(true));
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: { todo: newTodo }
    }).done((res) => {
      dispatch(newTodoAdded(res.id, res.todo));
      dispatch(toggleLoading(false));
    }).fail((xhr, status, err) => {
      dispatch(toggleLoading(false));
      console.log('/api/todos.json', status, err.toString());
    });
  };
}

function newTodoAdded(id, todo) {
  return {
    type: 'TODO_ADDED',
    data: { id, todo }
  };
}

function textExists(value) {
  return {
    type: 'TEXT_EXISTS',
    data: value
  }
}