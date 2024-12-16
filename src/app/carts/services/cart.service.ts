import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICart } from '../models/icart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getAllCarts(): Observable<ICart[]> {
    return this.http.get<ICart[]>(`${environment.API_URL}/carts`);
  }

}
