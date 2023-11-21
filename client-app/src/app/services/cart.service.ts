import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Product } from 'src/libs/entities/src/lib/product/product';
// import { HttpClient} from '@angular/common/http';
// import {AssignmentPortal } from '@funle/entities';

@Injectable({
  providedIn: 'root',
})
export class CartService {

    // this is a temporary solution until i figure out a better way.

    private isCartOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public toggleCart() {
        this.isCartOpenSubject.next(!this.isCartOpenSubject.getValue());
        console.log(this.isCartOpenSubject.getValue());
    }

    public get isCartOpen() {
        return this.isCartOpenSubject.asObservable();
    }


}