import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/libs/entities/src/lib/product/order';
import { OrderData } from 'src/libs/requestsData/OrderData';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // TODO moet verandert worden bij productie
  webserver = "http://localhost:8080";

  constructor(private http: HttpClient) {}

  getAll = () => this.http.get<Order[]>(this.webserver + '/api/orders/all');
  create = (order: OrderData) => this.http.post<Order>(this.webserver + '/api/orders/create', order);
}