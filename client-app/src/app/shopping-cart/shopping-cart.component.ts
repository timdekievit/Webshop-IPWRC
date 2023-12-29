import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of} from 'rxjs';
import { Product } from 'src/libs/entities/src/lib/product/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  @Input() showCheckoutButton = true;
  products$: Observable<Product[]> = of([]);
  cartTotalPrice$: Observable<number> = of(0);
  amount: number = 0;
  quantity: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.products$ = this.cartService.getcart();
    this.cartTotalPrice$ = this.cartService.getCartTotalPrice();
  }

  decreaseQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity--;
      this.cartService.updateQuantity(product, product.quantity);
    }
  }

  increaseQuantity(product: Product) {
    product.quantity++;
    this.cartService.updateQuantity(product, product.quantity);
  }

  removeItemFromCart(product: Product) {
    this.cartService.removeProductFromCart(product);
  }

  getCartTotal() {
    this.cartService.getCartTotalPrice
  }

  GoToCheckout() {
    this.router.navigate(['/checkout']);
  }

}
