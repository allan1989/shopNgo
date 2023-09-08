import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

describe('AppComponent', () => {
  let router: Router;
  const appRoutes: Routes = routes;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(appRoutes)
      ],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('creates the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('loads the Home component on initial load', () => {
    expect(router.url).toBe('/home');
  })
});
