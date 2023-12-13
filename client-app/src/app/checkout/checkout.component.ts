import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GiftCardService } from 'src/libs/api/src/lib/giftCard/giftcard.service';
import { ShoppingCartService } from 'src/libs/api/src/lib/shoppingCart/shoppingCart.service';
import { GiftCard } from 'src/libs/entities/src/lib/product/giftcard';
import { Product } from 'src/libs/entities/src/lib/product/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

// TODO continue expanding this component
export class CheckoutComponent implements OnInit {
  giftCard$: Observable<GiftCard> = new Observable<GiftCard>();
  products$: Observable<Product[]> = new Observable<Product[]>();
  amount: number = 0;

  constructor(private giftCardService: GiftCardService, private shoppingCartService: ShoppingCartService, private cartService: CartService) { }
  ngOnInit(): void {
    this.cartService.setCartClosed();
    this.products$ = this.shoppingCartService.get();

    this.products$.subscribe((products) => {
      this.amount = 0;
      products.forEach((product) => {
        this.amount += product.price;
      });
    });
  }

  getGiftCardAmount(id: string) {
    this.giftCard$ = this.giftCardService.get(id);
  }

  removeItemFromCart(product: Product) {
    this.shoppingCartService.del(product).subscribe()
    this.products$ = this.shoppingCartService.get();
  }

  getCartTotal() {
    return this.amount;
  }  

}
