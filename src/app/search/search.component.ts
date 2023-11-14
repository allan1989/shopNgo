import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from '../models';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  data$!: Observable<IProduct[] | any>;
  page: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
  ) { }

  ngOnInit(): void {

    this.data$ = this.storeService.productsFiltered$;

    this.activatedRoute.paramMap.subscribe((response: any) => {
      const { origin, searchTerm } = response.params;
      this.storeService.productsFilteredParams$.next({ origin, searchTerm });
    });
  }

  addProductInCart(product: IProduct) {
    this.storeService.addProductInCart(product)
  }

}
