import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, startWith } from 'rxjs';
import { ShoppingCartService } from 'src/libs/api/src/lib/shoppingCart/shoppingCart.service';
import { Product } from 'src/libs/entities/src/lib/product/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products$: Observable<Product[]> = of([]);
  amount: number = 0;
  quantity: number = 0;

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }
  
  ngOnInit(): void {
    this.shoppingCartService.get().subscribe(
      (data: any) => {
        console.log(data);
      });
      this.products$ = this.shoppingCartService.get().pipe(startWith([]));
      this.products$.subscribe((products) => {
        this.amount = 0;
        products.forEach((product) => {
          this.amount += product.price;
        });
      });
  }

  removeItemFromCart(product: Product) {
      this.shoppingCartService.del(product).subscribe()
    }

  getCartTotal() {
    return this.amount;
  }  

  GoToCheckout() {
    this.router.navigate(['/checkout']);
  }

}
