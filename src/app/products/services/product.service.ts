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

  addNewProduct(product: IProduct) : Observable<IProduct>{
    return this.http.post<IProduct>(`${environment.API_URL}/products`, product);
  }

  updateProduct(productId: number, product: IProduct) : Observable<IProduct>{
    return this.http.put<IProduct>(`${environment.API_URL}/products/${productId}`, product);
  }
}
