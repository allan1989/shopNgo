import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IHttpResponse, dummyDataAPI, dummyDataCategoriesAPI } from './models';
import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;
  let controller: HttpTestingController;
  let httpClient: HttpClient;

  it('creates the service', () => {
    expect(service).toBeTruthy();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(StoreService);
    controller = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient)
  });

  afterEach(() => {
    controller.verify();
  });

  it('creates the service', () => {
    expect(service).toBeTruthy()
  })

  it('gets all the products', () => {
    const testData: IHttpResponse = dummyDataAPI;

    httpClient.get<IHttpResponse>(service.productsURL).subscribe({
      next: (response) => service.products$.next(response.products)
    });

    const request = controller.match(service.productsURL)[0];

    request.flush(testData);

    expect(service.products$.value).toBe(testData.products);
    expect(service.productsErrored$.value).toEqual(null)

  });

  it('returns an error when API call fails', () => {
    const httpDummyErrorMessage = "Http failure response for https://dummyjson.com/products?limit=0: 500 Not Found";

    httpClient.get<IHttpResponse>(service.productsURL).subscribe({
      next: () => fail('should fail'),
      error: (error: HttpErrorResponse) => service.productsErrored$.next(error.message)
    });

    const request = controller.match(service.productsURL)[0];

    request.flush('Http failure Response', {
      status: 500,
      statusText: 'Not Found'
    })

    expect(service.productsErrored$.value).toBe(httpDummyErrorMessage);
    expect(service.products$.value).toEqual([]);

  })

  it('invokes the methods getProducts and getCategories on init', () => {
    const spyOne = spyOn(service, 'getProducts');
    const SpyTwo = spyOn(service, 'getCategories');

    service.init();

    expect(spyOne).toHaveBeenCalled();
    expect(SpyTwo).toHaveBeenCalled();
  })

  it('gets all the categories', () => {
    const testData = dummyDataCategoriesAPI;

    httpClient.get<string[]>(service.categoriesURL).subscribe({
      next: (response) => service.productsCategories$.next(response)
    });

    const request = controller.expectOne(service.categoriesURL);

    request.flush(testData);

    expect(service.productsCategories$.value).toBe(testData);
    expect(service.productsCategoriesErrored$.value).toEqual(null)

  });

});
