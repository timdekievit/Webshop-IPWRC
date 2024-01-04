import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

    private loginSubject = new Subject<boolean>();
  
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

    isAdmin(): Observable<boolean> {
      if (this.jwtService.isLoggedIn()) {
        return this.getCurrentUser().pipe(
          map((user: User) => {
            return user.role.toString() === 'ADMIN';
          })
        );
      } else {
        return of(false)
      }

    }

    getLoginObservable(): Observable<boolean> {
      return this.loginSubject.asObservable();
    }

    setLoginSubject(value: boolean): void {
      this.loginSubject.next(value);
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