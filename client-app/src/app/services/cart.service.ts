import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

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