import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodos() {
    let todoData = window.localStorage.getItem('todos');
    let todosStored: Todo[] = [];
    if (todoData !== null) {
      todosStored = JSON.parse(todoData);
    }
    return todosStored;
  }

  addTodo(addTodo: string) {
    let todosStored: Todo[] = [];
    todosStored = this.getTodos()
    
    let todo: Todo = {
      id: todosStored.length + 1,
      name: addTodo,
      isComplete: false
    };

    todosStored.push(todo);
    window.localStorage.setItem('todos', JSON.stringify(todosStored));
  }

  deleteTodo(deleteTodo: Todo) {
    let todosStored: Todo[] = [];
    todosStored = this.getTodos()

    let saved = todosStored.filter(todo => {
      return todo.id !== deleteTodo.id;
    });

    window.localStorage.setItem('todos', JSON.stringify(saved));
  }

  updateTodo(updateTodo: Todo) {
    let todosStored: Todo[] = [];
    todosStored = this.getTodos()

    let oldTodoIndex = todosStored.findIndex(todo => {
      return todo.id == updateTodo.id;
    });

    todosStored[oldTodoIndex] = updateTodo;   
    window.localStorage.setItem('todos', JSON.stringify(todosStored));
  }
}
