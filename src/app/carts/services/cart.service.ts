import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICart } from '../models/icart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getAllCarts(dates?: any): Observable<ICart[]> {
    let params = new HttpParams()
                        .append('startDate', dates?.startDate)
                        .append('endDate', dates?.endDate);
    return this.http.get<ICart[]>(`${environment.API_URL}/carts`, {params}); //{params: params}
  }

  deleteCart(id: number): Observable<ICart> {
    return this.http.delete<ICart>(`${environment.API_URL}/carts/${id}`);
  }
}
