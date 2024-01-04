import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Observable, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { JwtService } from './services/jwt.service';
import { AuthenticationService } from 'src/libs/api/src/lib/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Webshop';

  isCartOpen$: Observable<boolean> = new Observable<boolean>();
  isAdmin$: Observable<boolean> = new Observable<boolean>();
  isAdmin: boolean = false;
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();

  constructor(private cartService: CartService, private jwtService: JwtService, private authenticationService: AuthenticationService) { }
  ngOnInit(): void {
    this.isLoggedIn$ = this.jwtService.GetIsLoggedInObservable();
    this.isCartOpen$ = this.cartService.isCartOpen;
    this.isAdmin$ = this.isLoggedIn$.pipe(
      switchMap(() => this.authenticationService.isAdmin())
    );

    this.isAdmin$.subscribe((isAdmin: boolean) => {
      console.log('isAdmin: ', isAdmin);
      this.isAdmin = isAdmin;
    });
  }

  toggleCart() {
    this.cartService.toggleCart();
  }

  logout() {
    this.jwtService.logout();
    this.cartService.setCartClosed();
    this.cartService.emptyCart();
    this.isAdmin$ = of(false);
  }

}
