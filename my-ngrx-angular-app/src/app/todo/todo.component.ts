import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
//import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { addTodo,
         deleteTodo,
         loadTodos } from './todo.actions';
import { selectAllTodos } from '../todo/todo.selectors'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  
  public todos$ = this.store.select(selectAllTodos)
  public todoUserInput: string = '';
  
  constructor( private store: Store<any> ) {}
  //STRICT MODE ISSUE: https://github.com/ngrx/platform/issues/2780

  ngOnInit() {
    this.store.dispatch(loadTodos());
  }
  
  addTodo() {
    if(this.todoUserInput !== '') {
      this.store.dispatch(addTodo({ content: this.todoUserInput}));
      this.todoUserInput = '';
      //this._todoService.addTodo(this.todoUserInput);
      //this.todos = this._todoService.getTodos();
    }
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch(deleteTodo({ guid: todo.guid }));
  }

  evaluateCheckbox(todo: Todo){
    //this._todoService.updateTodo(todo);
  }
}
