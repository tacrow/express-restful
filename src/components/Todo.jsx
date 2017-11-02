'use strict';

import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions.js';

// components
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import LoadingIndicator from './LoadingIndicator.jsx';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.handleInputForm = this.handleInputForm.bind(this);
  }

  handleNewTodo(todo) {
    this.props.dispatch(actions.addTodo(todo));
  }

  handleInputForm(value) {
    this.props.dispatch(actions.textExists(value));
  }

  componentDidMount() {
    this.props.dispatch(actions.loadTodos());
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <TodoForm
          addTodo={this.handleNewTodo}
          handleKeyup={this.handleInputForm}
          objects={this.props.todos}
          isText={this.props.isText}
        />
        {this.props.isLoading ? <LoadingIndicator /> : null}
        <TodoList todos={ this.props.todos } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { todos, isText, isLoading } = state;
  return {
    todos,
    isText,
    isLoading
  };
}

export default connect(mapStateToProps)(Todo)