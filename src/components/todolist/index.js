import React, { Component } from 'react';
import './index.css'

const dummy = [
    {
        title: 'React is cool',
        body: 'React workflow is fun',
        date: '1/1/1970'
    },
    {
        title: 'React is cool',
        body: 'React workflow is fun',
        date: '1/1/1970'
    },
    {
        title: 'React is cool',
        body: 'React workflow is fun',
        date: '1/1/1970'
    }
]


class TodoList extends Component {
  constructor(props) {
      super(props);
      this.state = { dummy };
  }
  render() {
    return(
      <div className="todo-container">
        <div className="todos-list">
          <h1 className="head-title">My Todos</h1>
          {this.state.dummy.map(item => (
          <div className="todo-item">
            <div className="todo-title">{item.title}</div>
            <div className="todo-body">{item.body}</div>
            <div className="todo-date">{item.date}</div>
            <div className="todo-dismiss-btn">Dismiss</div>
          </div>))}
        </div>
      </div>
  )}
}

export default TodoList;