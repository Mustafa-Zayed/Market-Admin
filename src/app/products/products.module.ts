import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './components/product/product.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'all', pathMatch: 'full' },
//   { path: 'all', component: AllProductsComponent },
//   { path: 'product/:id', component: ProductDetailsComponent }
// ];

@NgModule({
  declarations: [
    AllProductsComponent,
    ProductDetailsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    // RouterModule.forChild(routes),
    SharedModule,
    FormsModule
  ],
  exports: [
    ProductComponent
  ]
})
export class ProductsModule { }
