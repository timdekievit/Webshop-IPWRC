import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { GiftCard } from 'src/libs/entities/src/lib/product/giftcard';

@Injectable({
  providedIn: 'root',
})

export class GiftCardService {
  webserver = "http://localhost:8080";

  constructor(private http: HttpClient) {}

  get = (id: string) => this.http.get<GiftCard>(`${this.webserver}/api/giftcards/${id}`);

}