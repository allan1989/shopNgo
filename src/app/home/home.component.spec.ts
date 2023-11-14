import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { StoreService } from '../store.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { dummyDataCategoriesAPI } from '../models';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: StoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(StoreService);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('invokes the init function on ngOnInit', () => {
    const serviceSpy = spyOn(service, 'init');
    component.ngOnInit();
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('displays an error when API call fails to retrieve categories', () => {
    component.productsCategoriesErrored$ = of('Error');
    fixture.detectChanges();
    const productsCategoriesErrorMessage = fixture.debugElement.nativeElement.querySelector('#productsCategoriesErrorMessage');
    const links = fixture.debugElement.nativeElement.querySelectorAll('.category-link');
    expect(productsCategoriesErrorMessage).toBeTruthy();
    expect(links.length).toBe(0);
    component.productsCategories$.subscribe(val => expect(val).toBe(null))
  });

  it('displays a list of categories on successful API call', () => {
    component.productsCategories$ = of(dummyDataCategoriesAPI);
    fixture.detectChanges();
    const links = fixture.debugElement.nativeElement.querySelectorAll('.category-link');
    expect(links.length).toBe(20);
    component.productsErrored$.subscribe(val => expect(val).toBe(null))
  });

  it('displays an error when API call fails to retrieve products', () => {
    component.productsErrored$ = of('Error');
    fixture.detectChanges();
    const productsErrorMessage = fixture.debugElement.nativeElement.querySelector('#productsErrorMessage');
    expect(productsErrorMessage).toBeTruthy();
    component.productsCategories$.subscribe(val => expect(val).toBe(null))
  });

});
