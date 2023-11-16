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
    new Item('4', 'hat', 15, 1, false, '../../../../assets/images/hat.jpg'),
    new Item('5', 'book', 8, 1, false, '../../../../assets/images/book.jpg'),
    new Item('6', 'teddy bear', 25, 1, false, '../../../../assets/images/teddy.jpg'),
    new Item('7', 'sunglasses', 18, 1, false, '../../../../assets/images/sunglasses.jpg'),
    new Item('8', 'guitar', 150, 1, false, '../../../../assets/images/guitar.jpg'),
  ];

  private itemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.items);
  private itemsInShoppingCartSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

  // later the code above will be replaced by the server call

  //   constructor(private http: HttpClient) {}

  constructor() { }

  //   getAll = () => this.http.get<AssignmentPortal[]>('/api/assignments/');
  getAll = () => this.itemsSubject.asObservable();

  // the get function below should not return undefined how to garantee that?
  // get = (id: string) => of(this.itemsSubject.getValue().find((item) => item.id === id));
  get = (id: string) => {
    const item = this.itemsSubject.getValue().find((item) => item.id === id);
    if (item === undefined) {
      return of(new Item('', '', 0, 0, false, ''));
    }
    return of(item);
  }


  getItemsInShoppingCart = () => this.itemsInShoppingCartSubject.asObservable();

  del = (id: string) => {
    let items = this.itemsInShoppingCartSubject.getValue();
    console.log(items);
    items = items.filter((item) => item.id !== id);
    this.itemsInShoppingCartSubject.next(items);
  }

  add = (item: Item) => {
    let items = this.itemsInShoppingCartSubject.getValue();
    items.push(item);
    this.itemsInShoppingCartSubject.next(items);
  }

}