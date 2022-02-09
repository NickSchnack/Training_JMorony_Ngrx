import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Item } from '../models/item.model'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoItems: Item[] = [];
  @ViewChild('todo_textbox_input') todoUserInput;

  constructor(private _todoService: TodoService) { 
    this.todoItems = this._todoService.getItems();
  }

  ngOnInit(): void {
  }
  
  addToDoItem(name: string): void {
    console.log('Add ' + name);
    if(name !== '') {
      this._todoService.addItem(name);
      this.todoItems = this._todoService.getItems();
    }
    this.todoUserInput.nativeElement.value = '';
  }

  deleteToDoItem(item: Item): void {
    console.log('Delete ' + name);
    this._todoService.deleteItem(item);
    this.todoItems = this._todoService.getItems();
  }

  evaluateCheckbox(item: Item){
    this._todoService.updateItem(item);
  }
}
