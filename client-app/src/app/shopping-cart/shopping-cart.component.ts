import { Component, OnInit } from '@angular/core';
import { Observable, of, startWith } from 'rxjs';
import { ProductService } from 'src/libs/api/src/lib/product/product.service';
import { ShoppingCartService } from 'src/libs/api/src/lib/shoppingCart/shoppingCart.service';
import { Product } from 'src/libs/entities/src/lib/product/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products$: Observable<Product[]> = of([]);

  // eventually the items need to be fetched from the server

  constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService) { }
  
  ngOnInit(): void {
    this.shoppingCartService.get().subscribe(
      (data: any) => {
        console.log(data);
      });
      this.products$ = this.shoppingCartService.get().pipe(startWith([]));
  }

  // delete items from the items$ observable
  removeItemFromCart(product: Product) {
      this.productService.del(product.id);
    }

}
