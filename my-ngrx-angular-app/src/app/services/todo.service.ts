import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  async getTodos(): Promise<Todo[]> {
    let todoData = window.localStorage.getItem('todos');
    let todosStored: Todo[] = [];
    if (todoData !== null) {
      todosStored = JSON.parse(todoData);
    }
    return todosStored;
  }

  async saveTodos(todos: Todo[]) {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }
}
