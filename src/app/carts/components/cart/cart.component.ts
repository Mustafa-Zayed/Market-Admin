import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IProduct } from 'src/app/products/models/iproduct';
import { Subscription } from 'rxjs';
import { ICart } from '../../models/icart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  carts: ICart[] = [];
  subscriptions: Subscription[] = [];
  
  // // Properties to hold modal data
  // @ViewChild('modalId') modalElement!: ElementRef;
  // deleteModalProd: IProduct | undefined;
  // delOrClearCartFlag: string = '';

  constructor(private cartService :CartService) {}

  ngOnInit(): void {
    this.getAllCarts();
  }

  getAllCarts(){
    let sub = this.cartService.getAllCarts().subscribe((data)=>{
      this.carts = data;
      console.log(this.carts);
    })

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
