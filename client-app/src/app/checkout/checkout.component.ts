import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GiftCardService } from 'src/libs/api/src/lib/giftCard/giftcard.service';
import { GiftCard } from 'src/libs/entities/src/lib/product/giftcard';
import { Product } from 'src/libs/entities/src/lib/product/product';
import { CartService } from '../services/cart.service';
import { OrderService } from 'src/libs/api/src/lib/order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderHandlingService } from '../services/orderHandling.service';
import { OrderData } from 'src/libs/requestsData/OrderData';
import { JwtService } from '../services/jwt.service';
import { AuthenticationService } from 'src/libs/api/src/lib/authentication/authentication.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit, OnDestroy {
  giftCard$: Observable<GiftCard> = new Observable<GiftCard>();
  products$: Observable<Product[]> = new Observable<Product[]>();
  amount: number = 0;
  checkoutForm: FormGroup;
  order: OrderData | undefined;
  private ngUnsubscribe = new Subject();

  constructor(private giftCardService: GiftCardService, 
    private cartService: CartService, 
    private orderService: OrderService,
    private orderHandlingService: OrderHandlingService,
    private jwtService: JwtService,
    private authenticationService: AuthenticationService,
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
    this.products$ = this.cartService.getcart();

    this.products$.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(products => {
      this.amount = 0;
      products.forEach((product) => {
        this.amount += product.price;
      });
    });

    this.setFormInformationIfUserIsLoggedIn();

  }

  setFormInformationIfUserIsLoggedIn() {
      if (this.jwtService.isLoggedIn()) {
        this.authenticationService.getCurrentUser().subscribe((user) => {
          this.checkoutForm.controls['name'].setValue(user.name);
          this.checkoutForm.controls['address'].setValue(user.address);
          this.checkoutForm.controls['city'].setValue(user.city);
          this.checkoutForm.controls['zipCode'].setValue(user.zipCode);
        });
      }

    }

    getGiftCardAmount(id: string) {
      this.giftCard$ = this.giftCardService.get(id);
    }

    PlaceOrder(order: OrderData) {

      if (order) this.orderHandlingService.setCurrentOrder(order);
      this.router.navigate(['/confirmation']);
      this.orderService.create(order).subscribe();
    }

    onSubmit() {
      if (this.checkoutForm.valid) {
        this.products$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(products => {
          this.order = {
            ...this.checkoutForm.value,
            products: products
          };
        });
        if (this.order) {
          this.PlaceOrder(this.order);
          this.order = undefined;
        }
      }
    }

  getCartTotal() {
    return this.amount;
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(1);
    this.ngUnsubscribe.complete();
  }
  

}
