import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { LoginData } from 'src/libs/entities/src/lib/product/LoginData';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
    webserver = 'http://localhost:8080';
    token: string | null = null;
  
    constructor(private http: HttpClient) {}
  
    login(user: LoginData): Observable<any> {
      return this.authenticate(user, '/api/auth/authenticate');
    }
  
    register(user: LoginData): Observable<any> {
      return this.authenticate(user, '/api/auth/register');
    }

    private authenticate(user: LoginData, endpoint: string): Observable<any> {
      return this.http.post(`${this.webserver}${endpoint}`, user).pipe(
        tap((response: any) => {
          this.setToken(response.token);
        })
      );
    }

    private setToken(token: string | null): void {
      this.token = token;

      // You can also store the token in local storage or a cookie for persistence
      if (this.token) {
        localStorage.setItem('token', this.token);
      }
    }
}