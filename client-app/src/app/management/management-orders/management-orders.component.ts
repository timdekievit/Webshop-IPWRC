import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'src/libs/api/src/lib/order/order.service';
import { Order } from 'src/libs/entities/src/lib/product/order';

@Component({
  selector: 'app-management-orders',
  templateUrl: './management-orders.component.html',
  styleUrls: ['./management-orders.component.scss']
})
export class ManagementOrdersComponent implements OnInit {

  orders$: Observable<Order[]> = new Observable<Order[]>();

  constructor(private orderService: OrderService) { }
  
  ngOnInit(): void {
    this.orders$ = this.orderService.getAll();
  }

  getTotalPrice(order: Order): number {
    return order.products.reduce((acc, curr) => acc + curr.price, 0);
  }

  getProductsTitles(order: Order): string {
    return order.products.map(p => p.title).join(', ');
  }

}
