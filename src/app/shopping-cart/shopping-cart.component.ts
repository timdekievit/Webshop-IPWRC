import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  dummyItem: Item = new Item('1', 'Dummy Item', 100, 1, false, '../../assets/images/shoe.png');

  // eventually the items need to be fetched from the server
  shoppingCartItems: Item[] = [];
  
  
  ngOnInit(): void {
    this.shoppingCartItems.push(this.dummyItem);
    
  }

  removeItemFromCart(item: Item) {
      this.shoppingCartItems = this.shoppingCartItems.filter((i) => i.id !== item.id);
    }

}
