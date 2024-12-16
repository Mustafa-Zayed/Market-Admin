import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsModule } from '../products/products.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: CartComponent },
  // { path: '', redirectTo: 'cart' , pathMatch: 'full' },
  // { path: 'cart', component: CartComponent }
]

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProductsModule,
    SharedModule,
    FormsModule
  ]
})
export class CartsModule { }
