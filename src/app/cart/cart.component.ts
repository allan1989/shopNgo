import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Observable, from, groupBy, map, mergeMap, tap, toArray } from 'rxjs';
import { IProduct } from '../models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  data$!: Observable<IProduct[]>;
  quantityLimit = Array(10).fill(0).map((_, i) => i + 1);

  constructor(private storeService: StoreService) {

  }

  ngOnInit(): void {
    this.data$ = this.storeService.productsInCart$;
    //this.data$.subscribe(console.log)

    this.storeService.productsToDisplay$.subscribe(
      result => {
        const list = from(result);
        this.data$ = from(result).pipe(
          groupBy(product => product.id),
          mergeMap(group => group.pipe(toArray())),
        ).pipe(
          toArray(),
          map(group => group.map(el => el.reduce((acc, curr, i) => {

            if (acc.quantity && curr.id === acc.id) {
              acc.quantity++
              return acc
            }
            else {
              return acc
            }
          }))),
          tap(console.log)
        )
      }
    )
  }
}
