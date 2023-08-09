import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Item } from 'src/libs/entities/src/lib/item/item';
// import { HttpClient} from '@angular/common/http';
// import {AssignmentPortal } from '@funle/entities';

@Injectable({
  providedIn: 'root',
})
export class ItemService { 
    // create a list of items with 3 dummy items inside the list from the model item.ts
    items: Item[] = [
        new Item('1', 'shoe', 10, 1, false, '../../../../assets/images/shoe.jpg'),
        new Item('2', 'balloon', 20, 1, false, '../../../../assets/images/balloon.png'),
        new Item('3', 'pizza', 30, 1, false, '../../../../assets/images/pizza.jpg'),
    ];

    private itemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.items);

    // later the code above will be replaced by the server call

//   constructor(private http: HttpClient) {}

  constructor() {}

//   getAll = () => this.http.get<AssignmentPortal[]>('/api/assignments/');
  getAll = () => this.itemsSubject.asObservable();

  del = (id: string) => {
  this.items = this.items.filter((i) => i.id !== id);
  // update the observable
  this.itemsSubject.next(this.items);
} 
    
//   get = (id: string) => this.http.get<AssignmentPortal>('/api/assignments/' + id);


}