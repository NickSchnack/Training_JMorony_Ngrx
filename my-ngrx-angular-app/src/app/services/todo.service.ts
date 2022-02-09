import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getItems() {
    let itemData = window.localStorage.getItem('items');
    let itemsStored: Item[] = [];
    if (itemData !== null) {
      itemsStored = JSON.parse(itemData);
    }
    return itemsStored;
  }

  addItem(addItem: string) {
    let itemsStored: Item[] = [];
    itemsStored = this.getItems()
    
    let item: Item = {
      id: itemsStored.length + 1,
      name: addItem,
      isComplete: false
    };

    itemsStored.push(item);
    window.localStorage.setItem('items', JSON.stringify(itemsStored));
  }

  deleteItem(deleteItem: Item) {
    let itemsStored: Item[] = [];
    itemsStored = this.getItems()

    let saved = itemsStored.filter(item => {
      return item.id !== deleteItem.id;
    });

    window.localStorage.setItem('items', JSON.stringify(saved));
  }

  updateItem(updateItem: Item) {
    let itemsStored: Item[] = [];
    itemsStored = this.getItems()

    let oldItemIndex = itemsStored.findIndex(item => {
      return item.id == updateItem.id;
    });

    itemsStored[oldItemIndex] = updateItem;   
    window.localStorage.setItem('items', JSON.stringify(itemsStored));
  }
}
