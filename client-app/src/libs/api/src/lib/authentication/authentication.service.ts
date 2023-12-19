import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginData } from 'src/libs/requestsData/LoginData';
import { UpdateUserData } from 'src/libs/requestsData/UpdateUserData';

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

    update(user: UpdateUserData): Observable<any> {
      return this.authenticate(user, '/api/auth/update');
    }

    private authenticate(user: any, endpoint: string): Observable<any> {
      return this.http.post(`${this.webserver}${endpoint}`, user).pipe(
        tap((response: any) => {
          this.setToken(response.token);
        })
      );
    }

    private setToken(token: string | null): void {
      this.token = token;

      if (this.token) {
        localStorage.setItem('token', this.token);
      }
    }
}