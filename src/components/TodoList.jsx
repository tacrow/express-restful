'use strict';

import React from 'react';

export default class TodoList extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.todos;

    const todoItems = data.map((item, index) =>
      <li key={index}>
        {item.todo}
      </li>
    );

    return(
      <ul>{todoItems}</ul>
    );
  }
}