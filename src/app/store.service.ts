import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Subject, combineLatestWith, concat, from, groupBy, map, merge, mergeMap, of, reduce, scan, tap, toArray } from 'rxjs';
import { IProduct, IHttpResponse } from './models';
import { group } from '@angular/animations';

enum origin {
  HOMEPAGE = 'homepage',
  SEARCHINPUT = 'searchInput'
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public products$ = new BehaviorSubject<IProduct[]>([]);
  public productsFilteredParams$ = new BehaviorSubject<{ origin: string, searchTerm: string }>({ origin: '', searchTerm: '' });
  public productsErrored$ = new BehaviorSubject<null | string>(null);
  public productsCategoriesErrored$ = new BehaviorSubject<null | string>(null);
  public productsCategories$ = new BehaviorSubject<string[] | null>(null);
  public productSelectedId$ = new BehaviorSubject<number>(1);
  public productsInCart$ = new BehaviorSubject<IProduct[]>([]);
  public productsInCartForDisplay$ = new BehaviorSubject<IProduct[]>([]);
  public productsInCartTotal$ = new BehaviorSubject<number>(0);

  public readonly productsURL = 'https://dummyjson.com/products?limit=0';
  public readonly categoriesURL = 'https://dummyjson.com/products/categories';
  public readonly productsOfACategoryURL = 'https://dummyjson.com/products/category/';
  public readonly searchProductsURL = 'https://dummyjson.com/products/search?q=/';

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

  productsFiltered$ = this.products$.pipe(combineLatestWith(this.productsFilteredParams$))
    .pipe(
      map(([products, params]) => {
        if (params.origin === origin.HOMEPAGE) {
          return products.filter(product => product.category === params.searchTerm)
        } else {
          return products.filter(product => product.title.toLowerCase().includes(params.searchTerm) || product.description.toLowerCase().includes(params.searchTerm))
        }
      })
    )

  productSelected$ = this.products$.pipe(combineLatestWith(this.productSelectedId$))
    .pipe(
      map(([products, id]) => {
        return products.filter(product => product.id === id)
      })
    )

  generateLinkURL(link: string) {
    if (link === '' || link === undefined) {
      return '/home';
    } else {
      return link;
    }
  }

  addProductInCart(product: IProduct) {
    const newProduct = Object.assign(product, { quantity: 1 });
    const oldValue = this.productsInCart$.value;
    const newData = [...oldValue, newProduct];

    //console.log('newData2', newData)
    this.productsInCart$.next(newData);
    this.productsInCartTotal$.next(this.productsInCart$.value.length);
  }

  productsToDisplay$ = this.productsInCart$;


}


// productsToDisplay$ = from(this.productsInCart$.getValue()).pipe(
//   tap(value => console.log('tap', value)),
//   groupBy(product => product.id),
//   mergeMap(group => group.pipe(toArray())), // (2) [{…}, {…}]
// ).pipe(
//   toArray(),
//   map(group => group.map(el => el.reduce((acc, curr, i) => {

//     if (acc.quantity && curr.id === acc.id) {
//       acc.quantity++
//       return acc
//     }
//     else {
//       return acc
//     }


//   }))))

//   public products = from([
//     { name: 'Macbook', id: 1, quantity: 1 },
//     { name: 'Dell', id: 2, quantity: 1 },
//     { name: 'Macbook', id: 1, quantity: 1 },
//     { name: 'Asus', id: 3, quantity: 1 }
//   ]);

//   productsToDisplay$$ = this.products.pipe(
//     groupBy(product => product.id),
//     mergeMap(group => group.pipe(toArray())), // (2) [{…}, {…}]
//   ).pipe(
//     toArray(),
//     map(group => group.map(el => el.reduce((acc, curr, i) => {
//       if (curr.id === acc.id) {
//         acc.quantity++
//         return acc
//       }
//       else {
//         return acc
//       }
//     }))))
// }

// https://stackoverflow.com/questions/51625364/rxjs-behaviorsubject-and-groupby-operator
