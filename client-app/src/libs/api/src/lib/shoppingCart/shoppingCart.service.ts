import { Injectable } from '@angular/core';
import { Product } from 'src/libs/entities/src/lib/product/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'src/app/services/jwt.service';

@Injectable({
  providedIn: 'root',
})

export class ShoppingCartService {
  webserver = "http://localhost:8080";

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  private getHeaders = () => {
    const authToken = this.jwtService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  }

  get = () => {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(this.webserver + '/api/shoppingCart', { headers });
  }

  add = (product: Product) => {
    const headers = this.getHeaders();
    return this.http.post<any>(this.webserver + '/api/shoppingCart/addProduct', {"id": product.id}, { headers });
  }

  del = (product: Product) => {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.webserver}/api/shoppingCart/deleteProduct/${product.id}`, { headers });
  }
}
