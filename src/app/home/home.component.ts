import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public productsCategories$!: Observable<string[] | null>;
  public productsCategoriesErrored$!: Observable<null | string>;
  public productsErrored$!: Observable<null | string>;
  public readonly storeService!: StoreService;

  constructor(storeService: StoreService) {
    this.storeService = storeService
  }

  ngOnInit(): void {
    this.storeService.init();
    this.productsCategories$ = this.storeService.productsCategories$;
    this.productsCategoriesErrored$ = this.storeService.productsCategoriesErrored$;
    this.productsErrored$ = this.storeService.productsErrored$;
  }
}
