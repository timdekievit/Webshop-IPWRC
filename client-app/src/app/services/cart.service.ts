import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

    // TODO a user that is not loggedin should be able to add products to the cart

    private isCartOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public toggleCart() {
        this.isCartOpenSubject.next(!this.isCartOpenSubject.getValue());
        console.log(this.isCartOpenSubject.getValue());
    }

    public setCartClosed() {
        this.isCartOpenSubject.next(false);
    }

    public get isCartOpen() {
        return this.isCartOpenSubject.asObservable();
    }


}