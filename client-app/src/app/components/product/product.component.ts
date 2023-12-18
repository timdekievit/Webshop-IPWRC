import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/libs/api/src/lib/shoppingCart/shoppingCart.service';
import { Product } from 'src/libs/entities/src/lib/product/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product!: Product;
  
  constructor( private shoppingCartService: ShoppingCartService) { }

  addToCart(product: Product) {
    console.log('add to cart');
    this.shoppingCartService.add(product).subscribe((res) => console.log(res));
  }

}
