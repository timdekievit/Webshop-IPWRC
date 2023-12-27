import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Order } from 'src/libs/entities/src/lib/product/order';
import { OrderData } from 'src/libs/requestsData/OrderData';

@Injectable({
  providedIn: 'root',
})
export class OrderHandlingService {

    private order: BehaviorSubject<OrderData | null> = new BehaviorSubject<OrderData | null>(null);


    getCurrentOrder() {
        return this.order.asObservable();
    }

    setCurrentOrder(order: OrderData) {
        this.order.next(order);
    }

}