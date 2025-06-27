$(function () {
    loadTodos();

    $('#new').click(function () {
        let text = prompt("Enter a new TO DO:");
        if (text && text.trim() !== '') {
            addTodo(text.trim());
            saveTodos();
        }
    });

    function addTodo(text) {
        let newDiv = $('<div></div>').addClass('todo-item').text(text);

        newDiv.click(function () {
            if (confirm("Do you want to delete this TO DO?")) {
                $(this).remove();
                saveTodos();
            }
        });

        $('#ft_list').prepend(newDiv);
    }

    function saveTodos() {
        let todos = [];
        $('.todo-item').each(function () {
            todos.push($(this).text());
        });
        document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
    }

    function loadTodos() {
        let cookies = document.cookie.split(';');
        let todoData = cookies.find(row => row.trim().startsWith('todos='));
        if (todoData) {
            let todos = JSON.parse(decodeURIComponent(todoData.split('=')[1]));
            todos.forEach(todo => {
                addTodo(todo);
            });
        }
    }
});


