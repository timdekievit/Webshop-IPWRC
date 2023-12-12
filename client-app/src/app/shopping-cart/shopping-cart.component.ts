import { Component, OnInit } from '@angular/core';
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

  constructor(private shoppingCartService: ShoppingCartService) { }
  
  ngOnInit(): void {
    this.shoppingCartService.get().subscribe(
      (data: any) => {
        console.log(data);
      });
      this.products$ = this.shoppingCartService.get().pipe(startWith([]));
  }

  removeItemFromCart(product: Product) {
      this.shoppingCartService.del(product).subscribe()
    }

}
