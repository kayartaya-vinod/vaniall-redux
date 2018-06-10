import { createStore } from 'redux';

let idCounter = 3;

let initialState = [
    {
        id: 0,
        text: 'learn redux',
        completed: false
    },
    {
        id: 1,
        text: 'learn thunk',
        completed: false
    },
    {
        id: 2,
        text: 'learn d3js',
        completed: false
    },
]

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: idCounter++,
                    text: action.text,
                    completed: false
                }
            ];
        case 'TOGGLE_TODO':
            return state.map(todo => Object.assign(todo,
                { completed: (todo.id == action.id) ? !todo.completed : todo.completed })
            );
    }
    return state;
}

const store = createStore(reducer);

document.getElementById('btnAddTodo')
    .onclick = () => {
        let tfTodo = document.getElementById('tfTodo');
        store.dispatch({ type: 'ADD_TODO', text: tfTodo.value });
        tfTodo.value = '';
        tfTodo.focus();
    };

window['toggleTodo'] = (id)=>{
    store.dispatch({ type: 'TOGGLE_TODO', id })
}

const showList = () => {
    let todoList = document.getElementById('todoList');
    let items = '';
    store.getState()
        .map(todo => {
            return `<li onclick="toggleTodo(${todo.id})" style="cursor: pointer;">
            ${todo.completed?'<strike>':''}
            ${todo.text}
            ${todo.completed?'</strike>':''}
            </li>`
        })
        .forEach(todo => items += todo);
    todoList.innerHTML = items;

    let todoCount = store.getState().length;
    document.getElementById('todoCount').innerHTML = todoCount;

    let completedTodoCount = store.getState().filter(todo=>todo.completed).length
    document.getElementById('completedTodoCount').innerHTML = completedTodoCount;

    
}

store.subscribe(() => showList());

showList();
