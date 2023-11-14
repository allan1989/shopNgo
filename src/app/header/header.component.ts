import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private storeService: StoreService
  ) { }

  searchTerm: string = '';
  numberOfProductsInCart$!: Observable<number>;

  ngOnInit(): void {
    this.numberOfProductsInCart$ = this.storeService.productsInCartTotal$;
  }

  handleKeyUp(e: any) {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.searchTerm = e.target.value;
      this.handleSubmit();
    }
  }

  handleSubmit() {
    if (this.searchTerm === '') {
      alert('Le champs est vide !');
      return;
    }
    this.router.navigate(['search', 'searchpage', this.searchTerm]);
  }

}
