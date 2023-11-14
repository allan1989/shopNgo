import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from "@angular/router";
import { SearchComponent } from './search.component';
import { routes } from '../../app/app-routing.module';
import { StoreService } from '../store.service';
import { PaginationControlsComponent, PaginatePipe } from 'ngx-pagination';


xdescribe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let router: Router;
  let service: StoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent, PaginationControlsComponent, PaginatePipe],
      providers: [StoreService],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    router = TestBed.inject(Router);
    service = TestBed.inject(StoreService);


    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
