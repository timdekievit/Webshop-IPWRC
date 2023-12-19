import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/libs/api/src/lib/product/product.service';
import { Product } from 'src/libs/entities/src/lib/product/product';
import { ShoppingCartService } from 'src/libs/api/src/lib/shoppingCart/shoppingCart.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]> = new Observable<Product[]>();
  searchString: string = '';
  randomProducts: Product[] = [];

  constructor(private productService: ProductService,
    private shoppingCartService: ShoppingCartService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.inintializeProducts();
  }

  inintializeProducts() {
    this.route.queryParamMap.subscribe(params => {
      const searchText = params.get('searchtext');

      if (searchText) {
        this.searchString = searchText;
        this.products$ = this.productService.search(searchText);
      } else {
        this.searchString = '';
        this.products$ = this.productService.getAll();
      }
    });

    this.products$.subscribe(items => {
      this.randomProducts = this.getRandomItems(items, 3); // Get 3 random items
    });
  }

  searchProducts(title: string) {
    this.products$ = this.productService.search(title);
    this.router.navigate([], { queryParams: { searchtext: title } });
  }

  getRandomItems(products: Product[], count: number): Product[] {
    const shuffledItems = [...products]; // Copy the items array to avoid modifying the original array
    const randomItems = [];

    while (randomItems.length < count && shuffledItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * shuffledItems.length);
      const randomItem = shuffledItems.splice(randomIndex, 1)[0]; // Remove the item from the array
      randomItems.push(randomItem);
    }

    return randomItems;
  }

  addToCart(product: Product) {
    console.log('add to cart');
    this.shoppingCartService.add(product).subscribe((res) => console.log(res));
  }

}
