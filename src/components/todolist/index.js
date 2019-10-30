import React, { Component } from 'react';
import './index.css'

const dummy = [
  {
      id: 1,
      title: 'Mix with API',
      body: 'Build powerful apps',
      date: '1/1/1970',
      completed: false,
      expired: false
  },
  {
      id: 2,
      title: 'Learn state management',
      body: 'making changes',
      date: '1/1/1970',
      completed: false,
      expired: false
  },
  {
      id: 3,
      title: 'Learn React',
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
      body: 'try to undo me',
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
      this.onUndo = this.onUndo.bind(this);
      this.onDismiss = this.onDismiss.bind(this);
      this.onDelete = this.onDelete.bind(this);
  }

  onCompleted(id) {
    const markComplete = this.state.dummy.filter(function(item) {
      return item.id === id
    })
    markComplete[0].completed = true

    const updateList = this.state.dummy.filter(function(item) {
      return item.id !== id
    })

    var joined = updateList.concat(markComplete)

    this.setState({ dummy: joined })
  }

  onUndo(id) {
    const markUndo = this.state.dummy.filter(function(item) {
      return item.id === id
    })
    markUndo[0].completed = false
    markUndo[0].expired = false

    const updateList = this.state.dummy.filter(function(item) {
      return item.id !== id
    })

    var joined = updateList.concat(markUndo)

    this.setState({ dummy: joined })
  }

  onDismiss(id) {
    const markDismiss = this.state.dummy.filter(function(item) {
      return item.id === id
    })
    markDismiss[0].expired = true
    markDismiss[0].completed = false

    const updateList = this.state.dummy.filter(function(item) {
      return item.id !== id
    })

    var joined = updateList.concat(markDismiss)

    this.setState({ dummy: joined })
  }

  onDelete(id) {
    const markDelete = this.state.dummy.filter(function(item) {
      return item.id === id
    })

    const updateList = this.state.dummy.filter(function(item) {
      return item.id !== id
    })

    this.setState({ dummy: updateList })
  }

  render() {

    function isLive() {
      return function (item) {
        if (item.completed === false &&
            item.expired === false) {
              return item
        } 
      }
    }

    function isCompleted() {
      return function (item) {
        return item.completed === true
      }
    }

    function isDeleted() {
      return function (item) {
        return item.expired === true
      }
    }

    const completedList = this.state.dummy.filter(isLive(this.state.dummy))
    const noneCompleted = this.state.dummy.filter(isCompleted(this.state.dummy))
    const emptyList = this.state.dummy.filter(isDeleted(this.state.dummy))

    return(
      <div className="todo-container">
        <div className="todos-list">
          <h1 className="head-title">Yet Another Todo List</h1>
          <h3>Todo</h3>
          {completedList.length ? completedList.map(item => (
          <div key={item.id} className="todo-item">
            <div className="todo-contents">
              <div className="todo-title">{item.title}</div>
              <div className="todo-body">{item.body}</div>
              <div className="todo-date">{item.date}</div>
            </div>
            <div className="todo-btn-container">
              <button className="todo-complete-btn" onClick={() => this.onCompleted(item.id)}>Done</button>
              <button className="todo-dismiss-btn" onClick={() => this.onDismiss(item.id)} >X</button>
            </div>
          </div>)): 
          <div>Looks Like you have nothing to do? Congrats!</div>}

          <h3>Add Todo</h3>
          <form className="search-form">
            <span>Title:</span>
            <input className="search-box" type="text" placeholder="Todo Title..."/>
            <span>Todo:</span>
            <input className="search-box" type="text" placeholder="Todo..."/>
          </form>
          <button className="addtodo-btn">+ ADD TODO</button>

          <h3>Completed</h3>
          {noneCompleted.length ? noneCompleted.map(item => (
          <div key={item.id} className="completed-todo-item">
            <div className="todo-contents">
              <div className="todo-title">{item.title}</div>
              <div className="todo-body">{item.body}</div>
              <div className="todo-date">{item.date}</div>
            </div>
            <div className="todo-btn-container">
              <button className="todo-undo-btn" onClick={() => this.onUndo(item.id)}>Undo</button>
              <button className="todo-dismiss-btn" onClick={() => this.onDismiss(item.id)}>X</button>
            </div>
          </div>)):
          <div>Looks like you have some work to do...</div>}

          <h3>Deleted</h3>
          {emptyList.length ? emptyList.map(item => (
          <div key={item.id} className="deleted-todo-item">
            <div className="todo-contents">
              <div className="todo-title">{item.title}</div>
              <div className="todo-body">{item.body}</div>
              <div className="todo-date">{item.date}</div>
            </div>
            <div className="todo-btn-container">
              <button className="todo-undo-btn" onClick={() => this.onUndo(item.id)}>Undo</button>
              <button className="todo-dismiss-btn" onClick={() => this.onDelete(item.id)}>X</button>
            </div>
          </div>)):
          <div>Deleting items from here is permanent!</div>}
        </div>
      </div>
  )}
}

export default TodoList;