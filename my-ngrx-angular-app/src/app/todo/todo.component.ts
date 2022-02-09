import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  @ViewChild('todo_textbox_input') todoUserInput;

  constructor(private _todoService: TodoService) { 
    this.todos = this._todoService.getToDos();
  }

  ngOnInit(): void {
  }
  
  addToDo(name: string): void {
    console.log('Add ' + name);
    if(name !== '') {
      this._todoService.addToDo(name);
      this.todos = this._todoService.getToDos();
    }
    this.todoUserInput.nativeElement.value = '';
  }

  deleteToDo(todo: Todo): void {
    console.log('Delete ' + name);
    this._todoService.deleteToDo(todo);
    this.todos = this._todoService.getToDos();
  }

  evaluateCheckbox(todo: Todo){
    this._todoService.updateToDo(todo);
  }
}
