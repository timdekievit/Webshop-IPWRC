import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/libs/entities/src/lib/product/order';
import { Product } from 'src/libs/entities/src/lib/product/product';
import { OrderHandlingService } from '../services/orderHandling.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  order$: Observable<Order | null> = new Observable<null>();

  constructor(private orderHandlingService: OrderHandlingService) { }
  
  ngOnInit(): void {
    this.order$ = this.orderHandlingService.getCurrentOrder();
  }

}
