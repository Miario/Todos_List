import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import * as apiCalls from './api';

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
	async loadTodos() {
		let todos = await apiCalls.getTodos();
		// Update state with todos
		this.setState({todos});
	}

	async addTodo(val) {
		let newTodo = await apiCalls.createTodo(val);
		this.setState({todos: [...this.state.todos, newTodo]})
	}

	async deleteTodo(id) {
		await apiCalls.removeTodo(id);
		const todos = this.state.todos.filter(todo => todo._id !== id)
		this.setState({todos: todos});
	}

	async toggleTodo(todo) {
		let updatedTodo = await apiCalls.updateTodo(todo);
		const todos = this.state.todos.map(todo => 
			(todo._id === updatedTodo._id) ? {...todo, completed: !todo.completed}
			: todo
			)
		this.setState({todos: todos});

	}

	render() {
		// Map through todos and create an array
		const todos = this.state.todos.map((todo) => (
			<TodoItem
				// adding key id for each todo
				key={todo._id}
				{...todo}
				// Passes id to deleteTodo function and removes todo
				onDelete={this.deleteTodo.bind(this, todo._id)}
				onToggle={this.toggleTodo.bind(this, todo)}
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