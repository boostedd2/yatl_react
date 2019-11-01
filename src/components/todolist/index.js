import React, { Component } from 'react';
import './index.css'

const dummy = [
  /*{
      id: 1,
      title: 'Mix with API',
      body: 'Build powerful apps',
      date: '1/1/1970',
      completed: false,
      expired: false
  },*/
]

var todoTitle = ''
var todoText = ''


class TodoList extends Component {
  constructor(props) {
      super(props);
      this.state = {
        dummy,
        todoTitle,
        todoText,
      };

      this.onCompleted = this.onCompleted.bind(this);
      this.onUndo = this.onUndo.bind(this);
      this.onDismiss = this.onDismiss.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.onAddTodo = this.onAddTodo.bind(this);
  }

  onAddTodo() {
    const updateList = this.state.dummy
    var inTest = true
    var usedId = []
    var newID = ''
    var today = new Date()
    const months = { 
      1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 
      5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 
      9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
    }
    var date = months[(today.getMonth()+1)]+'. '+today.getDate()+', '+today.getFullYear()
    
    for (var i = 0; i < updateList.length; i++) {
      usedId.push(updateList[i].id)
    }
    
    while (inTest) {
      newID = Math.floor((Math.random() * 100) + 1)
      if (usedId.includes(newID) === false) {
        inTest = false
      }
    }
    const newTodo = [
      {
        id: newID,
        title: this.state.todoTitle,
        body: this.state.todoText,
        date: date,
        completed: false,
        expired: false
      }
    ]
    var joined = updateList.concat(newTodo)
    this.setState({ 
      dummy: joined,
      todoTitle: '',
      todoText: ''
    })
  }

  onCompleted(id) {
    const markComplete = this.state.dummy.filter(function(item) {
      return item.id === id
    })
    markComplete[0].completed = true

    const updateList = this.state.dummy.filter(function(item) {
      return item.id !== id
    })

    var joined = markComplete.concat(updateList)

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

    var joined = markDismiss.concat(updateList)

    this.setState({ dummy: joined })
  }

  onDelete(id) {

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
          <h1 className="head-title">Yet Another To Do List</h1>

          <h3>Add Todo</h3>
          <form className="search-form">
            <span>To Do:</span>
            <input
              id="add-todo-title"
              className="search-box"
              type="text"
              placeholder="To Do..."
              value={this.state.todoTitle}
              onChange={event => this.setState({ todoTitle: event.target.value})} 
            />
            <span>Details:</span>
            <input
              id="add-todo-text"
              className="search-box"
              type="text"
              placeholder="(optional)"
              value={this.state.todoText}
              onChange={event => this.setState({ todoText: event.target.value})}
            />
            <button className="addtodo-btn" onClick={e => (e.preventDefault(), this.onAddTodo())}>+ ADD TODO</button>
          </form>
         
          
          <h3>To Do</h3>
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
          <div>Get to work.</div>}

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