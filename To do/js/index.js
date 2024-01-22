// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;


// Funções

// const function = () => {} eh outra forma de sintaxe de uma funcao

const saveTodo = (text) => {

    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    //Incorporar um elemento dentro de outro
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);
    
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn);
    
    //incrementar o item da lista na lista geral
    todoList.appendChild(todo);

    todoInput.value = "";
    // Para facilitar que o usuario ja comece digitando outra tarefa
    todoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
    //basicamente um array de todos 
    const todos = document.querySelectorAll("todo");

    todos.forEach((todo) => {
        //primeiro seleciona o elemento e depois seleciona a propriedade desejada
        let todoTitle = todo.querySelector("h3");

        //se tiver certo, altera o texto
        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    });
};

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue) {
        saveTodo(inputValue);
    }
});

// evento para os cliques dos botoes finish, edit e remove
document.addEventListener("click", (e) => {
    
    const targetEl = e.target;
    //para que o programa identifique que o botao foi apertado do elemento da lista mais proximo, que eh o seu "pai"
    const parentEl = targetEl.closest("div");
    //vamos usar o titulo como forma de identificar qual elemento da lista sera editado
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")) {
        //o todoTitle recebe texto do titulo do elemento pai
        todoTitle = parentEl.querySelector("h3").innerHTML;
    }

    if(targetEl.classList.contains("finish-todo")) {
        //incrementar a classe done, com todos os seus atributos de cor e tal no elemento que esta done
        parentEl.classList.toggle("done");
    }
    
    if(targetEl.classList.contains("edit-todo")) {
        /* O que fazer:
        1- criar uma funcao para esconder o formulario atual e exibir um de edicao
        
        */

        toggleForms();

        //mudo o valor do input do edit
        editInput.value = todoTitle;
        //salvar o valor anterior para consulta e alteracao
        oldInputValue = todoTitle;
    }
    
    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove()
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("click", (e) => {
    e.preventDefault();

    const editInputvalue = editInput.value;

    if(editInputvalue) {
       updateTodo(editInputvalue); //atualizar
    }

    toggleForms()
});