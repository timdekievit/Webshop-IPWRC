import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHandlingService } from '../services/orderHandling.service';
import { OrderData } from 'src/libs/requestsData/OrderData';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  order$: Observable<OrderData | null> = new Observable<null>();

  constructor(private orderHandlingService: OrderHandlingService) { }
  
  ngOnInit(): void {
    this.order$ = this.orderHandlingService.getCurrentOrder();
  }

}
