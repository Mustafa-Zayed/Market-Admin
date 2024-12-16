import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input()
  prod!: IProduct;

  @Output()
  onAddToCart: EventEmitter<any> = new EventEmitter<any>();

  addBtnFlag: boolean = false;
  prodQuantity: number = 1;

  constructor() {}

  ngOnInit(): void {
    // console.log('Product Component');
  }

  addToCartClick(clickedProd: IProduct) {
    if (this.prodQuantity < 1) return;
    this.onAddToCart.emit({
      product: clickedProd,
      quantity: this.prodQuantity,
    }); //this.prod works as well
    this.addBtnFlag = false;
  }
}
