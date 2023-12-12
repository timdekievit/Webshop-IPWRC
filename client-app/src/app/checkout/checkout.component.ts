import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GiftCardService } from 'src/libs/api/src/lib/giftCard/giftcard.service';
import { GiftCard } from 'src/libs/entities/src/lib/product/giftcard';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

// TODO continue expanding this component
export class CheckoutComponent {
  giftCard$: Observable<GiftCard> = new Observable<GiftCard>();

  constructor(private giftCardService: GiftCardService) { }

  getGiftCardAmount(id: string) {
    this.giftCard$ = this.giftCardService.get(id);
  }
}
