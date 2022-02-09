import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { v4 as uuidv4 } from 'uuid';

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
      guid: uuidv4(),
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
      return todo.guid !== deleteTodo.guid;
    });

    window.localStorage.setItem('todos', JSON.stringify(saved));
  }

  updateTodo(modifiedTodo: Todo) {
    let todosStored: Todo[] = [];
    todosStored = this.getTodos()

    let oldTodoIndex = todosStored.findIndex(todo => {
      return todo.guid == modifiedTodo.guid;
    });

    todosStored[oldTodoIndex] = modifiedTodo;   
    window.localStorage.setItem('todos', JSON.stringify(todosStored));
  }
}
