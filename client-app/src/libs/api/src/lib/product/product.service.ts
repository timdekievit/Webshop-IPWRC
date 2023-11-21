import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Product } from 'src/libs/entities/src/lib/product/product';
// import { HttpClient} from '@angular/common/http';
// import {AssignmentPortal } from '@funle/entities';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // create a list of items with 3 dummy items inside the list from the model item.ts
  products: Product[] = [
    new Product('1', 'shoe', 10, 1, false, '../../../../assets/images/shoe.jpg'),
    new Product('2', 'balloon', 20, 1, false, '../../../../assets/images/balloon.png'),
    new Product('3', 'pizza', 30, 1, false, '../../../../assets/images/pizza.jpg'),
    new Product('4', 'hat', 15, 1, false, '../../../../assets/images/hat.jpg'),
    new Product('5', 'book', 8, 1, false, '../../../../assets/images/book.jpg'),
    new Product('6', 'teddy bear', 25, 1, false, '../../../../assets/images/teddy.jpg'),
    new Product('7', 'sunglasses', 18, 1, false, '../../../../assets/images/sunglasses.jpg'),
    new Product('8', 'guitar', 150, 1, false, '../../../../assets/images/guitar.jpg'),
  ];

  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.products);
  private productsInShoppingCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  // later the code above will be replaced by the server call

  //   constructor(private http: HttpClient) {}

  constructor() { }

  //   getAll = () => this.http.get<AssignmentPortal[]>('/api/assignments/');
  getAll = () => this.productsSubject.asObservable();

  // the get function below should not return undefined how to garantee that?
  // get = (id: string) => of(this.itemsSubject.getValue().find((item) => item.id === id));
  get = (id: string) => {
    const product = this.productsSubject.getValue().find((product) => product.id === id);
    if (product === undefined) {
      return of(new Product('', '', 0, 0, false, ''));
    }
    return of(product);
  }


  getProductsInShoppingCart = () => this.productsInShoppingCartSubject.asObservable();

  del = (id: string) => {
    let products = this.productsInShoppingCartSubject.getValue();
    console.log(products);
    products = products.filter((product) => product.id !== id);
    this.productsInShoppingCartSubject.next(products);
  }

  add = (product: Product) => {
    let products = this.productsInShoppingCartSubject.getValue();
    products.push(product);
    this.productsInShoppingCartSubject.next(products);
  }

}