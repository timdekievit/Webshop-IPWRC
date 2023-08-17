import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from 'src/libs/api/src/lib/item/item.service';
import { Item } from 'src/libs/entities/src/lib/item/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items$: Observable<Item[]> = new Observable<Item[]>();

  randomItems: Item[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.items$ = this.itemService.getAll();
    this.items$.subscribe((items) => console.log(items));

    this.items$.subscribe(items => {
      this.randomItems = this.getRandomItems(items, 3); // Get 3 random items
    });
  }

  getRandomItems(items: Item[], count: number): Item[] {
    const shuffledItems = [...items]; // Copy the items array to avoid modifying the original array
    const randomItems = [];

    while (randomItems.length < count && shuffledItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * shuffledItems.length);
      const randomItem = shuffledItems.splice(randomIndex, 1)[0]; // Remove the item from the array
      randomItems.push(randomItem);
    }

    return randomItems;
  }

  addToCart(item: Item) {
    console.log('add to cart');
    this.itemService.add(item);
  }

}
