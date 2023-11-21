import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Webshop';

  isCartOpen$: Observable<boolean> = new Observable<boolean>();

  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.isCartOpen$ = this.cartService.isCartOpen;
  }

  toggleCart() {
    this.cartService.toggleCart();
  }
}