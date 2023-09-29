import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IProduct, IHttpResponse } from './models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public products$ = new BehaviorSubject<IProduct[]>([]);
  public productsErrored$ = new BehaviorSubject<null | string>(null);
  public productsCategoriesErrored$ = new BehaviorSubject<null | string>(null);
  public productsCategories$ = new BehaviorSubject<string[] | null>(null);

  public readonly productsURL = 'https://dummyjson.com/products?limit=0';
  public readonly categoriesURL = 'https://dummyjson.com/products/categories';

  constructor(private http: HttpClient) { }

  public init() {
    this.getProducts();
    this.getCategories();
  }

  public getProducts(): void {
    this.http.get<IHttpResponse>(this.productsURL).subscribe({
      next: (res) => this.products$.next(res.products),
      error: (err: HttpErrorResponse) => this.productsErrored$.next(err.message)
    })
  }

  public getCategories(): void {
    this.http.get<string[]>(this.categoriesURL).subscribe({
      next: res => this.productsCategories$.next(res),
      error: err => this.productsCategoriesErrored$.next(err.message)
    })
  }
}
