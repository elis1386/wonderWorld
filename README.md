# E-Commerce System

This project revolves around the creation of an E-Commerce system using Angular for the frontend and interactions with the FakeAPI or an equivalent backend service. The main objective is to offer an intuitive shopping experience for users and an efficient management interface for administrators.

- Frontend: CSS, TypeScript, Angular, NgRx for state management
- Backend: Your backend endpoint

## Table of Contents

- [Features](#features)
  - [Core Features](#1-core-features)
  - [Additional Features](#2-additional-features)
- [Prerequisites](#prerequisites)
- [Guidelines to start working with NgRx](#guidelines-to-start-working-with-ngrx)

## Features

### 1. Core features

- Guest Functionalities:
  - Product Browsing: Explore all available products, view product details, search, sort, and filter products.
  - Cart Management: Add products to the cart, view cart, and adjust quantities or remove items.
- User Functionalities
  - User Management: Sign up, log in, and log out. Users should not have admin rights upon registration.
  - Product Browsing, Cart Management.
- Admin Functionalities
  - User Management: Overview of all registered users, with the ability to delete users.
  - Product Management: View all products, add new products, edit existing products, and delete products.

### 2. Additional features

- User Functionalities
  - Profile Management: View and edit specific details of their profile. Option to delete their account.
  - Third-party Authentication: Allow registration and login using Google OAuth.
  - Ordering: Complete the purchase of items in the cart.
- Admin Functionalities
  - Extended User Management: Modify user roles, and register new users as admin.
- ... and any other enhancements that are envisioned...
- Start with some basic unit tests, such as testing actions and effects.

## Prerequisites

- Ensure the integration of NgRx for state management in the frontend.
- Implement routing and guards to protect certain routes.
- Properly handle errors, especially API related errors.
- Maintain a well-organized directory structure and naming convention in line with Angular best practices.
- The README should provide comprehensive information about the project and include deployment steps.

## Guidelines to start working with NgRx

_Remember that codes provided in this guidelines should only be used as references. Errors and conflicts could happen due to the differences of paths or other configurations in your codes._

1. Component creation

   ```
   ng generate component products
   ng generate component product-detail
   ng generate component cart
   ng generate component profile
   ng generate component admin-dashboard
   ng generate component manage-products
   ng generate component manage-users
   ```

   ... and generate all the components you might need. Otherwise, you can generate extra components later when needed.

2. Design Data Models

   Models can be stored either in a separate `src/models` folder or in component's respective folder. Please refer to the shape of data in the api to design the models. Example:

   - Products Model: `products.model.ts` (display list of products)
   - Product Model: `product.model.ts` (display single product)
   - Categories Model: `categories.model.ts`
   - User Model: `user.model.ts` (display single user)
   - Cart Model: `cart.model.ts`

3. Create services

- For example: Path: `src/app/services/products.service.ts`

```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/products'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  //add other CRUD operations
}
```

4. Setting up NgRx

- Define actions. For example, `products.actions.ts`:

  - Path: `src/app/store/actions/products.actions.ts`

  ```
  import { createAction, props } from '@ngrx/store';

  import { Product } from '../../models/product.model';

  export const loadProducts = createAction('[Products] Load Products');
  export const loadProductsSuccess = createAction('[Products] Load Products Success', props<{ products: Product[] }>());
  export const loadProductsFailure = createAction('[Products] Load Products Failure', props<{ error: any }>());
  // ... Similarly for other CRUD actions
  ```

- Implement effects to manage API requests. For example, let's handle the fetching of products from an API.

  - Path: `src/app/store/effects/products.effects.ts`
    - Class effects:

  ```
  import { Injectable } from '@angular/core';
  import { Actions, ofType, createEffect } from '@ngrx/effects';
  import { of } from 'rxjs';
  import { catchError, map, mergeMap } from 'rxjs/operators';

  import * as ProductsActions from './path-to-product-actions';
  import { ProductsService } from './path-to-products-service';  //

  @Injectable()
  export class ProductsEffects {

    constructor(
      private actions$: Actions,
      private productsService: ProductsService  // Inject the ProductsService
    ) {}

    loadProducts$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ProductsActions.loadProducts),
        mergeMap(() => this.productsService.getProducts()  // Use the injected service
          .pipe(
            map(products => ProductsActions.loadProductsSuccess({ products })),
            catchError(error => of(ProductsActions.loadProductsFailure({ error })))
          ))
      )
    );
  }
  ```

  - Or you can also use Functional effects:

  ```
  import { inject } from '@angular/core';
  import { catchError, exhaustMap, map, of, tap } from 'rxjs';
  import { Actions, createEffect, ofType } from '@ngrx/effects';

  import * as ProductsActions from './path-to-product-actions';
  import { ProductsService } from './path-to-products-service';

  export const loadProducts$ = createEffect(
    (actions$ = inject(Actions), productsService = inject(ProductsService)) => {
      return actions$.pipe(
          ofType(ProductsActions.loadProducts),
          mergeMap(() => productsService.getProducts()  // Use the injected service
            .pipe(
              map(products => ProductsActions.loadProductsSuccess({ products })),
              catchError(error => of(ProductsActions.loadProductsFailure({ error })))
            ))
        );
    },
    { functional: true }
  );
  ```

- Register effects. For example, let's register product effects in the root level.

  - Path: `src/app/app.module.ts`

  ```
  import { EffectsModule } from '@ngrx/effects';

  import {ProductsEffects} from './store/effects/products.effects';

  @NgModule({
  imports: [
      EffectsModule.forRoot([ProductsEffects]), // Register effects here
      // ...
  ],
  // ...
  })
  export class AppModule {}
  ```

- Create reducers. For example `products.reducer.ts`

  - Path: `src/app/store/reducers/products.reducer.ts`

    ```
    import { createReducer, on } from '@ngrx/store';

    import { Product } from '../../models/product.model';
    import * as ProductsActions from '../actions/products.actions';

    export const initialProductState: Product[] = [];

    export const productsReducer = createReducer(
        initialProductState,
        on(ProductsActions.loadProductsSuccess, (state, { products }) => [...products])
        // ... Similarly for other CRUD actions
    );
    ```

- Configure store: Path `src/app/app.module.ts`

  ```
  import { StoreModule } from '@ngrx/store';
  import { EffectsModule } from '@ngrx/effects';

  import {ProductsEffect} from './store/effects/products.effects';
  import { productsReducer } from './store/reducers/products.reducer';

  @NgModule({
  imports: [
    StoreModule.forRoot({ products: productsReducer, //...other reducers}),
    EffectsModule.forRoot([ProductsEffect]), // Register effects here
    // ...
  ],
  // ...
  })
  export class AppModule {}
  ```

- Usage of NgRx store in components

  - `ProductsComponent`

  ```
  import { Component, OnInit } from '@angular/core';
  import { Store } from '@ngrx/store';

  import * as ProductsActions from './path-to-your-actions-file';

  @Component({
    selector: 'app-products',
    template: `
      <!-- Your component template here -->
    `
  })
  export class ProducsComponent implements OnInit {

    products$: Observable<Product[]>;

    constructor(private store: Store) { }

    ngOnInit() {
      products$ = this.store.select(selectProducts);
      // Dispatch the loadProducts action when the component initializes
      this.store.dispatch(ProductsActions.loadProducts());
    }

  }
  ```

  - `products.component.html`:

  ```
  //...
  <div *ngFor="let product of products$ | async">
      <!-- Display product details -->
  </div>
  //...
  ```

5. Complete other components and adding routes

- Base App Structure

  - Create a base component layout that includes the header and footer. This component will act as a shell for all other components.
  - For example: if all pages share same header and footer, we can setup `app.component.html`:

  ```
  <app-header></app-header>
  <router-outlet></router-outlet>
  <app-footer></app-footer>

  ```

- Define the primary routes for the application in `app-routing.module.ts`:

  ```
  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';

  // Import your components
  import { ProductsComponent } from './products/products.component';
  import { ProductComponent } from './product/product.component';

  const routes: Routes = [
    {
      path: '',
      redirectTo: '/products', // if you want to use products page as home page, otherwise, create component for homepage
      pathMatch: 'full'
    },
    {
      path: 'products',
      component: ProductsComponent,
    },
    // declare other paths here
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  ```

- To create navigation link in any template, use link element. For example: `<a routerLink="/products">Products</a>`
- Example of dynamic links: `<a *ngFor="let product of products" [routerLink]="['/products', product.id]">{{ product.name }}</a>`
- Example of using navigator method in component class:

  ```
  // ...
  constructor(private router: Router) { }

  navigateToProduct(productId: number) {
    this.router.navigate(['/products', productId]);
  }
  // ...
  ```

6. Testing examples

- Testing products actions

```
import * as ProductsActions from './products.actions';

describe('Products Actions', () => {
  it('should create a Load Products action', () => {
    const action = ProductsActions.loadProducts();
    expect(action.type).toEqual('[Products] Load Products');
  });

  it('should create a Load Products Success action', () => {
    const products: Product[] = [{ id: 1, name: 'Product 1', //... }, { id: 2, name: 'Product 2', //... }];
    const action = ProductsActions.loadProductsSuccess({ products });
    expect(action.type).toEqual('[Products] Load Products Success');
    expect(action.products).toEqual(products);
  });

  // Add similar tests for other actions ...
});

```

- Testing products effects

```
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';

import { ProductsService } from './products.service';
import * as ProductsActions from './products.actions';
import { ProductsEffects } from './products.effects';

describe('ProductEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductsEffects;
  let productsService: jasmine.SpyObj<ProductsService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions$),
        {
          provide: ProductsService,
          useValue: jasmine.createSpyObj('ProductsService', ['getProducts'])
        }
      ]
    });

    effects = TestBed.inject(ProductsEffects);
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
  });

  it('should load products successfully', () => {
    const products: Product[] = [{ id: 1, name: 'Product 1' }];
    productsService.getProducts.and.returnValue(of(products));
    actions$ = of(ProductsActions.loadProducts());

    effects.loadProducts$.subscribe(action => {
      expect(action).toEqual(ProductsActions.loadProductsSuccess({ products }));
    });
  });

  it('should handle product load failure', () => {
    productsService.getProducts.and.returnValue(throwError('error'));
    actions$ = of(ProductsActions.loadProducts());

    effects.loadProducts$.subscribe(action => {
      expect(action).toEqual(ProductsActions.loadProductsFailure({ error: 'error' }));
    });
  });

  // optionally, you can use marble test
  it('should dispatch loadProductsSuccess action on successful API call', () => {
    const products = [{ id: 1, name: 'Product A' }, { id: 2, name: 'Product B' }];

    const action = loadProducts();
    const outcome = loadProductsSuccess({ products });

    actions$ = hot('-a', { a: action });
    const response = cold('-b|', { b: products });
    const expected = cold('--c', { c: outcome });

    productService.getProducts.and.returnValue(response);

    expect(effects.loadProducts$).toBeObservable(expected);
  });

  it('should handle product load failure', () => {
    productsService.getProducts.and.returnValue(throwError('error'));
    actions$ = of(ProductsActions.loadProducts());

    effects.loadProducts$.subscribe(action => {
      expect(action).toEqual(ProductsActions.loadProductsFailure({ error: 'error' }));
    });
  });
});

```
