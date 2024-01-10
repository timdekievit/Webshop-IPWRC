import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { GiftCard } from 'src/libs/entities/src/lib/product/giftcard';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class GiftCardService {
  webserver = environment.webserver;
  
  constructor(private http: HttpClient) {}

  get = (id: string) => this.http.get<GiftCard>(`${this.webserver}/api/giftcards/${id}`);

}