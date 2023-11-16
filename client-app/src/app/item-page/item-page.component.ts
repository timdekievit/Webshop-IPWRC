import { Component, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from 'src/libs/api/src/lib/item/item.service';
import { Item } from 'src/libs/entities/src/lib/item/item';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {

  item$: Observable<Item> = new Observable<Item>();

  constructor(private itemService: ItemService, private route: Router) { }
  

  ngOnInit(): void {
    const id = this.route.url.split('/')[2];
    this.item$ = this.itemService.get(id);
  }

  addToCart(item: Item) {
    console.log('add to cart');
    this.itemService.add(item);
  }



}
