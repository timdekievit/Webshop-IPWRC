import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { LoginData } from 'src/libs/entities/src/lib/product/LoginData';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

 // TODO replace the dummy data with the server call and make sure i can receive a image file from the server.
 // TODO connect the image public id to the product.
export class AuthenticationService {
    webserver = 'http://localhost:8080';
    token: string | null = null;
  
    constructor(private http: HttpClient) {}
  
    login(user: LoginData): Observable<any> {
      return this.http.post(`${this.webserver}/api/auth/authenticate`, user).pipe(
        tap((response: any) => {
          // Assuming your server sends the token in the 'token' property of the response
          this.token = response.token;

          // You can also store the token in local storage or a cookie for persistence
          if (this.token) {
            localStorage.setItem('token', this.token);
          }
        })
      );
    }
  
    register(user: LoginData): Observable<any> {
      return this.http.post(`${this.webserver}/api/auth/register`, user).pipe(
        tap((response: any) => {
          // Assuming your server sends the token in the 'token' property of the response
          this.token = response.token;

          // You can also store the token in local storage or a cookie for persistence
          if (this.token) {
            localStorage.setItem('token', this.token);
          }
        })
      );
    }

}