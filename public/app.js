$(document).ready(function() {
	$.getJSON("/api/todos")
	.then(addTodos)
});

function addTodos(todos) {
	//add todos to page here
	todos.forEach(todo => {
		let newTodo = $(`<li class="task">${todo.name}</li>`);
		$('.list').append(newTodo);
	});
}