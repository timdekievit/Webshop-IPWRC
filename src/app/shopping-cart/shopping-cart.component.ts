import { Component, OnInit } from '@angular/core';
import { Item } from '../../libs/entities/src/lib/item/item';
import { Observable } from 'rxjs';
import { ItemService } from 'src/libs/api/src/lib/item/item.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  items$: Observable<Item[]> = new Observable<Item[]>();

  // eventually the items need to be fetched from the server

  constructor(private itemservice: ItemService) { }
  
  ngOnInit(): void {
    this.items$ = this.itemservice.getAll();
  }

  // delete items from the items$ observable
  removeItemFromCart(item: Item) {
      this.itemservice.del(item.id);
    }

}
