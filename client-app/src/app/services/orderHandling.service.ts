import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Order } from 'src/libs/entities/src/lib/product/order';

@Injectable({
  providedIn: 'root',
})
export class OrderHandlingService {

    private order: BehaviorSubject<Order | null> = new BehaviorSubject<Order | null>(null);


    getCurrentOrder() {
        return this.order.asObservable();
    }

    setCurrentOrder(order: Order) {
        this.order.next(order);
    }

}