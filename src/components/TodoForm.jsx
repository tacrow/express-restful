'use strict';

import React from 'react';

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addTodo(this.newTodo.value);
    this.newTodo.value = '';
  }

  handleKeyup(e) {
    this.props.handleKeyup(e.target.value);
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text"
               ref={(ref) => this.newTodo = ref}
               onKeyUp={this.handleKeyup}
               placeholder="todo" />
        <button type="submit"
                disabled={!this.props.isText}>
                Add todo
        </button>
        <div>
          <span>Todo:&nbsp;</span>
          <span>{this.props.objects.length + 1}</span>
        </div>
      </form>
    );
  }
}