import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories() : Observable<string[]>{
    return this.http.get<string[]>(`${environment.API_URL}/products/categories`);
  }

  getByCategory(category: string) : Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`${environment.API_URL}/products/category/${category}`);
  }
}
