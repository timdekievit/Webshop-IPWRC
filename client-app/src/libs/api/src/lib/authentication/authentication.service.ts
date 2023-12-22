import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginData } from 'src/libs/requestsData/LoginData';
import { UpdateUserData } from 'src/libs/requestsData/UpdateUserData';
import { User } from 'src/libs/entities/src/lib/user/user';
import { JwtService } from 'src/app/services/jwt.service';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
    webserver = 'http://localhost:8080';
    token: string | null = null;
  
    constructor(private http: HttpClient, private jwtService: JwtService) {}

    private getHeaders = () => {
      const authToken = this.jwtService.getToken();
      return new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    }
  
    login(user: LoginData): Observable<any> {
      return this.authenticate(user, '/api/auth/authenticate');
    }
  
    register(user: LoginData): Observable<any> {
      return this.authenticate(user, '/api/auth/register');
    }

    update(user: UpdateUserData): Observable<any> {
      return this.authenticate(user, '/api/auth/update');
    }

    getCurrentUser(): Observable<User> {
      const headers = this.getHeaders();
      return this.http.get<User>(`${this.webserver}/api/auth/current-user`, { headers });
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