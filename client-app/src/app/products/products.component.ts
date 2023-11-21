import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/libs/api/src/lib/product/product.service';
import { Product } from 'src/libs/entities/src/lib/product/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]> = new Observable<Product[]>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getAll();
  }

  addToCart(product: Product) {
    console.log('add to cart');
    this.productService.add(product);
  }

}
