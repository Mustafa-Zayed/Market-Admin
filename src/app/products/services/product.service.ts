import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartItems: { product: IProduct; quantity: number }[] = [];

  constructor(private http: HttpClient) {}

  getAllProducts() : Observable<IProduct>{
    return this.http.get<IProduct>(`${environment.API_URL}/products`);
  }

  getProductById(id: number) : Observable<IProduct>{
    return this.http.get<IProduct>(`${environment.API_URL}/products/${id}`);
  }

  addToCart(event: { product: IProduct; quantity: number }) {
    if (event.quantity < 1) return;
    
    let item = this.cartItems.find(
      (item: { product: IProduct; quantity: number }) =>
        item.product.id === event.product.id
    );

    if (item) item.quantity += event.quantity;
    else this.cartItems.push(event);

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    console.log(this.cartItems);
  }
}
