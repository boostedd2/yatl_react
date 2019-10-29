import React, { Component } from 'react';
import './index.css'

const dummy = [
  {
      id: 1,
      title: 'React is cool',
      body: 'React workflow is fun',
      date: '1/1/1970',
      completed: false,
      expired: false
  },
  {
      id: 2,
      title: 'React is cool',
      body: 'React workflow is fun',
      date: '1/1/1970',
      completed: false,
      expired: false
  },
  {
      id: 3,
      title: 'React is cool',
      body: 'React workflow is fun',
      date: '1/1/1970',
      completed: false,
      expired: false
  },
  {
      id: 4,
      title: 'These ones are done',
      body: 'add some more to the list',
      date: '1/1/1970',
      completed: true,
      expired: false
  },
  {
      id: 5,
      title: 'Some more completed',
      body: 'content management works',
      date: '1/1/1970',
      completed: true,
      expired: false
  },
  {
      id: 6,
      title: 'Give this a try',
      body: 'React workflow is fun',
      date: '1/1/1970',
      completed: true,
      expired: false
  },
  {
      id: 7,
      title: 'Deleted content',
      body: 'these items have been deleted',
      date: '1/1/1970',
      completed: false,
      expired: true
  },
  {
      id: 8,
      title: 'removed',
      body: 'maybe you can undo this?',
      date: '1/1/1970',
      completed: false,
      expired: true
  },
  {
      id: 9,
      title: 'old stuff',
      body: 'safe to delete',
      date: '1/1/1970',
      completed: false,
      expired: true
  }
]


class TodoList extends Component {
  constructor(props) {
      super(props);
      this.state = {
        dummy,
      };

      this.onCompleted = this.onCompleted.bind(this);
  }

  onCompleted(completed) {
    const updatedList = this.state.list.filter(function isNotID(item) {
      return item.id !== completed;
    })
  }

  render() {

    function isLive(comp) {
      return function (item) {
        if (item.completed === false &&
            item.expired === false) {
              return item
            }
      }
    }

    function isCompleted(comp) {
      return function (item) {
        return item.completed === true
      }
    }

    function isDeleted(comp) {
      return function (item) {
        return item.expired === true
      }
    }

    return(
      <div className="todo-container">
        <div className="todos-list">
          <h1 className="head-title">My Todos</h1>
          <h3>Todo</h3>
          {this.state.dummy.filter(isLive(this.state.dummy)).map(item => (
          <div key={item.id} className="todo-item">
            <div className="todo-contents">
              <div className="todo-title">{item.title}</div>
              <div className="todo-body">{item.body}</div>
              <div className="todo-date">{item.date}</div>
            </div>
            <div className="todo-btn-container">
            <button className="todo-complete-btn">Done</button>
            <button className="todo-dismiss-btn">X</button></div>
          </div>))}
          <h3>Add Todo</h3>
          <form className="search-form">
            <span>Title:</span>
            <input className="search-box" type="text" placeholder="Todo Title..."/>
            <span>Todo:</span>
            <input className="search-box" type="text" placeholder="Todo..."/>
          </form>
          <button className="addtodo-btn">+ ADD TODO</button>
          <h3>Completed</h3>
          {this.state.dummy.filter(isCompleted(this.state.dummy)).map(item => (
          <div key={item.id} className="completed-todo-item">
            <div className="todo-contents">
              <div className="todo-title">{item.title}</div>
              <div className="todo-body">{item.body}</div>
              <div className="todo-date">{item.date}</div>
            </div>
            <div className="todo-btn-container">
            <button className="todo-undo-btn">Undo</button>
            <button className="todo-dismiss-btn">X</button></div>
          </div>))}
          <h3>Deleted</h3>
          {this.state.dummy.filter(isDeleted(this.state.dummy)).map(item => (
          <div key={item.id} className="deleted-todo-item">
            <div className="todo-contents">
              <div className="todo-title">{item.title}</div>
              <div className="todo-body">{item.body}</div>
              <div className="todo-date">{item.date}</div>
            </div>
            <div className="todo-btn-container">
            <button className="todo-undo-btn">Undo</button>
            <button className="todo-dismiss-btn">X</button></div>
          </div>))}
        </div>
      </div>
  )}
}

export default TodoList;