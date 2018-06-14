$(document).ready(function() {
    $.getJSON("/api/todos")
        .then(addTodos)

    $('#todoInput').keypress(function(e) {
        if (e.which == 13) {
            createTodo();
        }
    });

    $('.list').on('click', 'span', function() {
        removeTodo($(this).parent());
    })
});

function addTodos(todos) {
    //add todos to page here
    todos.forEach(todo => {
        addTodo(todo);
    });
}

function addTodo(todo) {
    let newTodo = $(`<li class="task">${todo.name}<span>X</span></li>`);
    newTodo.data('id', todo._id);
    if (todo.completed) {
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}

function createTodo() {
    //send request to create a new todo
    let userInput = $('#todoInput').val();
    $.post('/api/todos', { name: userInput })
        .then(function(newTodo) {
            $('#todoInput').val('');
            addTodo(newTodo);
        })
        .catch(function(err) {
            console.log(err);
        })
}

function removeTodo(todo) {
    let clickedId = todo.data('id');
    let deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
            method: 'DELETE',
            url: deleteUrl
        })
        .then(function(data) {
            todo.remove();
        });
}