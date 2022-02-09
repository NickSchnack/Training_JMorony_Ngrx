import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  public todoUserInput: string = '';

  constructor(private _todoService: TodoService) { 
    this.todos = this._todoService.getToDos();
  }

  ngOnInit() {
  }
  
  addToDo() {
    if(this.todoUserInput !== '') {
      this._todoService.addToDo(this.todoUserInput);
      this.todos = this._todoService.getToDos();
    }
    this.todoUserInput = '';
  }

  deleteToDo(todo: Todo) {
    console.log('Delete ' + name);
    this._todoService.deleteToDo(todo);
    this.todos = this._todoService.getToDos();
  }

  evaluateCheckbox(todo: Todo){
    this._todoService.updateToDo(todo);
  }
}
