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

  isCartOpen = false;

  constructor(private itemService: ItemService) { }
  ngOnInit(): void {
    this.items$ = this.itemService.getAll();
    this.items$.subscribe((items) => console.log(items));
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    console.log(this.isCartOpen);
  }

  addToCart(item: Item) {
    console.log('add to cart');
    this.itemService.add(item);
  }

}
