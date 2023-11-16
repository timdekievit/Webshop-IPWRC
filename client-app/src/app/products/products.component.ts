import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from 'src/libs/api/src/lib/item/item.service';
import { Item } from 'src/libs/entities/src/lib/item/item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  items$: Observable<Item[]> = new Observable<Item[]>();

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.items$ = this.itemService.getAll();
  }

  addToCart(item: Item) {
    console.log('add to cart');
    this.itemService.add(item);
  }

}
