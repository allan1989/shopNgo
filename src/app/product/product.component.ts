import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from '../models';
import { StoreService } from '../store.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  data$!: Observable<IProduct[]>;
  previousPage: string | undefined = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {

    this.data$ = this.storeService.productSelected$;

    this.activatedRoute.paramMap.subscribe((response: any) => {
      const { id } = response.params
      this.storeService.productSelectedId$.next(+id);
      this.previousPage = this.storeService.generateLinkURL(this.navigationService.navigationHistory);
    })
  }


}
