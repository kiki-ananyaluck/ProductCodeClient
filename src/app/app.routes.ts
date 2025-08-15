import { Routes } from '@angular/router';
import { ProductCodeListComponent } from './pages/product-code-list/product-code-list';

export const routes: Routes = [
  { path: 'product-codes', component: ProductCodeListComponent },
  { path: '', redirectTo: 'product-codes', pathMatch: 'full' }
];
