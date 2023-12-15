import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/libs/entities/src/lib/product/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  webserver = "http://localhost:8080";

  constructor(private http: HttpClient) {}

  getAll = () => this.http.get<Order[]>(this.webserver + '/api/orders');
  create = (order: Order) => this.http.post<Order>(this.webserver + '/api/orders', order);
}