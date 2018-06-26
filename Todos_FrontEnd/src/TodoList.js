import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
const APIURL = '/api/todos/';

class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: []
		}
	this.addTodo = this.addTodo.bind(this);
	}

	componentWillMount() {
		this.loadTodos();
	}

	// Fetch Todos from Api
	loadTodos() {
		fetch(APIURL)
		.then(resp => {
			// Error handling
			if (!resp.ok) {
				if (resp.status >= 400 && resp.status < 500) {
					return resp.json().then(data => {
						let err = {errorMessage: data.message};
						throw err;
					});
				} else {
					let err = {errorMessage: 'Please try again later, server is not responding.'};
					throw err;
				}
			}
			return resp.json();
		})
		// Update state with todos
		.then(todos => this.setState({todos}));
	}

	addTodo(val) {
		fetch(APIURL, {
			method: 'post',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify({name: val})
		})
		.then(resp => {
			// Error handling
			if (!resp.ok) {
				if (resp.status >= 400 && resp.status < 500) {
					return resp.json().then(data => {
						let err = {errorMessage: data.message};
						throw err;
					});
				} else {
					let err = {errorMessage: 'Please try again later, server is not responding.'};
					throw err;
				}
			}
			return resp.json();
		})
		.then(newTodo => {
			this.setState({todos: [...this.state.todos, newTodo]})
		})
	}

	deleteTodo(id) {
		const deleteURL = APIURL + id;
		fetch(deleteURL, {
			method: 'delete',
		})
		.then(resp => {
			// Error handling
			if (!resp.ok) {
				if (resp.status >= 400 && resp.status < 500) {
					return resp.json().then(data => {
						let err = {errorMessage: data.message};
						throw err;
					});
				} else {
					let err = {errorMessage: 'Please try again later, server is not responding.'};
					throw err;
				}
			}
			return resp.json();
		})
		.then(() => {
			const todos = this.state.todos.filter(todo => todo._id !== id)
			this.setState({todos: todos});
		})
	}

	render() {
		// Map through todos and creating an array
		const todos = this.state.todos.map((todo) => (
			<TodoItem
				// adding key id for each todo
				key={todo._id}
				{...todo}
				// Passes id to deleteTodo function and removes todo
				onDelete={this.deleteTodo.bind(this, todo._id)}
			/>
			));
		return (
			<div>
				<h1>Todo List!</h1>
				<TodoForm addTodo={this.addTodo}/>
				<ul>
					{todos}
				</ul>
			</div>
		)
	}
}


export default TodoList;