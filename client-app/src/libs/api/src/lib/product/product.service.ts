import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Product } from 'src/libs/entities/src/lib/product/product';
import { HttpClient} from '@angular/common/http';
// import {AssignmentPortal } from '@funle/entities';

@Injectable({
  providedIn: 'root',
})

 // TODO replace the dummy data with the server call and make sure i can receive a image file from the server.
 // TODO connect the image public id to the product.
export class ProductService {
  webserver = "http://localhost:8080";

  private productsInShoppingCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

    getAll = () => this.http.get<Product[]>(this.webserver + '/api/products');
  // getAll = () => this.productsSubject.asObservable();

  // the get function below should not return undefined how to garantee that?
  // get = (id: string) => of(this.itemsSubject.getValue().find((item) => item.id === id));
  get = (id: string) => {
    // const product = this.productsSubject.getValue().find((product) => product.id === id);
    // if (product === undefined) {
    //   return of(new Product('', '', 0, 0, false, ''));
    // }
    // return of(product);
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