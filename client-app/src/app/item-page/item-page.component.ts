import { Component, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/libs/api/src/lib/product/product.service';
import { Product } from 'src/libs/entities/src/lib/product/product';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {

  product$: Observable<Product> = new Observable<Product>();

  constructor(private productService: ProductService, private route: Router) { }
  

  ngOnInit(): void {
    const id = this.route.url.split('/')[2];
    this.product$ = this.productService.get(id);
  }

  addToCart(product: Product) {
    console.log('add to cart');
    this.productService.add(product);
  }



}
