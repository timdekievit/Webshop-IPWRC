import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  decodeJwt(token: string): any {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    // Check if token is present and valid
    if (token) {
      const decodedToken = this.decodeJwt(token);
      // Check if token is not expired
      if (decodedToken && decodedToken.exp > Date.now() / 1000) {
        return true;
      }
    }
    return false;
  }
}