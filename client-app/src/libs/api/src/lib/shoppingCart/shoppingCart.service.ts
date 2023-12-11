import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/libs/entities/src/lib/product/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'src/app/services/jwt.service';

@Injectable({
  providedIn: 'root',
})

export class ShoppingCartService {
  webserver = "http://localhost:8080";

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  get = () => {
    // Get the JWT token from your authentication service (replace 'your-token' with the actual token)
    const authToken = this.jwtService.getToken();

    // Set the headers with the Authorization header containing the JWT token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    console.log('headers', headers);

    // Make the HTTP request with the headers
    return this.http.get<Product[]>(this.webserver + '/api/shoppingCart', { headers });
  }

  add = (product: Product) => {
    // Get the JWT token from your authentication service (replace 'your-token' with the actual token)
    const authToken = this.jwtService.getToken();

    // Set the headers with the Authorization header containing the JWT token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    console.log('headers', headers);
    console.log('product', product);

    // Make the HTTP request with the headers
    return this.http.post<any>(this.webserver + '/api/shoppingCart/addProduct', {"id": product.id}, { headers });
  }
}
