import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GiftCardService } from 'src/libs/api/src/lib/giftCard/giftcard.service';
import { ShoppingCartService } from 'src/libs/api/src/lib/shoppingCart/shoppingCart.service';
import { GiftCard } from 'src/libs/entities/src/lib/product/giftcard';
import { Product } from 'src/libs/entities/src/lib/product/product';
import { CartService } from '../services/cart.service';
import { OrderService } from 'src/libs/api/src/lib/order/order.service';
import { Order } from 'src/libs/entities/src/lib/product/order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderHandlingService } from '../services/orderHandling.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  giftCard$: Observable<GiftCard> = new Observable<GiftCard>();
  products$: Observable<Product[]> = new Observable<Product[]>();
  amount: number = 0;
  checkoutForm: FormGroup;
  order: Order | undefined;

  constructor(private giftCardService: GiftCardService, 
    private shoppingCartService: ShoppingCartService, 
    private cartService: CartService, 
    private orderService: OrderService,
    private orderHandlingService: OrderHandlingService,
    private fb: FormBuilder, 
    private router: Router) {
      this.checkoutForm = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', Validators.required]
      });
     }

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

  PlaceOrder(order: Order) {
    this.orderService.create(order).subscribe(
    (response) => {
      // Navigate to the confirmation page here
      // You can use Angular's Router for this
      // Make sure to import it and inject it in the constructor
      console.log(response);
      console.log(this.order);
      if (this.order) this.orderHandlingService.setCurrentOrder(this.order);
      this.router.navigate(['/confirmation']);
    },
    (error) => {
      // Handle any errors here
      console.error(error);
    }
  );
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.products$.subscribe(products => {
        this.order = {
          ...this.checkoutForm.value,
          products: products
        };
        if (this.order) this.PlaceOrder(this.order);
      });
    }
  }

  getCartTotal() {
    return this.amount;
  }  

}
