import { Component } from '@angular/core';
import { Item } from '../models/item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {

  // eventually the items need to be fetched from the server
  shoppingCartItems: Item[] = [];


  removeItemFromCart(item: Item) {
      this.shoppingCartItems = this.shoppingCartItems.filter((i) => i.id !== item.id);
    }

}
