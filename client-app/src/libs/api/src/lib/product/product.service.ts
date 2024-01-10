import { Injectable } from '@angular/core';
import { Product } from 'src/libs/entities/src/lib/product/product';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})

export class ProductService {
  webserver = environment.webserver;

  constructor(private http: HttpClient) {}

  getAll = () => this.http.get<Product[]>(this.webserver + '/api/products');
  get = (id: string) => this.http.get<Product>(this.webserver + '/api/products/' + id);
  search = (title: string) => this.http.get<Product[]>(`${this.webserver}/api/products/search?title=${title}`);
  create = (product: any) => this.http.post<any>(this.webserver + '/api/products', product);
}