import React, { Component } from 'react';
import './App.css';
import base from './config.js'


class App extends Component {
  constructor () {
    super()
    this.state = {
      todos: [],
      classFill: "",
      itemCount: ""
    }
  }

  componentDidMount() {
    this.sync = base.syncState('todos', {
      state: 'todos',
      context: this,
      asArray: true
   })
   if (this.state.todos.length !== 1 ) {
     this.setState({
       itemCount: "s" //why is this not leaving the "s" off when todos.length is 1?
    })}
  }


  addItem(e) {
    if(this.input.value === "") {
      alert("Error: You must type a todo item")
    } else if (e.keyCode === 13) {
    let item = {
      text: this.input.value.trim(), //is trim working right here?
      complete: false
    }
    let newItemArray = this.state.todos.concat(item)
    this.setState({
      todos: newItemArray
    })
    this.input.value = ""
   }
  }

  deleteItem(index) {
    var newList = this.state.todos
    newList.splice(index, 1) //why does this delete just the first item and not the selected item?
    this.setState({
      todos: newList
    })
  }

  completeItem() {
     if (this.state.classFill === ""){
          this.setState({classFill: 'completed'}) //why does this affect every li and not the selected one?
     } else if (this.state.classFill === 'completed')
         this.setState({classFill: ""})
     }

   editItem() {
     if (this.state.classFill === ""){
          this.setState({classFill: 'editing'}) //why does this affect every li and not the selected one?
     }
     //how do you actually edit text here?
  }


  render() {
    return (
      <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input className="new-todo" placeholder="What needs to be done?"
            autoFocus
            ref={input => this.input = input}
            onKeyUp={this.addItem.bind(this)}/>
          </header>

          <section className="main">

    				<input className="toggle-all" type="checkbox"/>

            <label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list">
    					{this.state.todos.map((item, index) => {
                  return <li className={this.state.classFill}key={index}>
                  <div className="view">
                  <input onClick={this.completeItem.bind(this)} className="toggle" type="checkbox"/>
    							<label
                  ref={label => this.label = label}
                  onDoubleClick={this.editItem.bind(this)}>
                  {item.text}
                  </label>
    							<button ref={button => this.button = button}
                  onClick={this.deleteItem.bind(this, item)}className="destroy"></button>
    						  </div>
    						<input className="edit" value={item.text}/>
    					</li>
             })
            }
    				</ul>
  			 </section>

         <footer className="footer">
           <span className="todo-count"><strong>{this.state.todos.length}</strong> item{this.state.itemCount} left</span>
           <ul className="filters">
             <li>
               <a className="selected" href="#/">All</a>
             </li>
             <li>
               <a href="#/active">Active</a>
             </li>
             <li>
               <a href="#/completed">Completed</a>
             </li>
           </ul>
           <button hidden={this.state.todos.length == 0} className="clear-completed">Clear completed</button>
         </footer>


    </section>
    )
  }
}


export default App;
