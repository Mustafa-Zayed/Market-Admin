import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IProduct } from 'src/app/products/models/iproduct';
import { Subscription } from 'rxjs';
import { ICart } from '../../models/icart';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/products/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  [x: string]: any;
  carts: ICart[] = [];
  // startDate: string ='';
  // endDate: string ='';
  subscriptions: Subscription[] = [];
  searchByDateForm:FormGroup;

  // Properties to hold modal data
  @ViewChild('modalId') modalElement!: ElementRef;
  delOrViewCartFlag: string = '';
  cartIdForDeleteOrView: number=0;
  prodsInCartForView: {product:IProduct; quantity: number}[] = [];

  constructor(private cartService :CartService, private productService:ProductService) {
    this.searchByDateForm=new FormGroup({
      startDate:new FormControl(''),
      endDate:new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getAllCarts();
  }

  getAllCarts(){
    let sub = this.cartService.getAllCarts().subscribe((data)=>{
      this.carts = data;
      // console.log(this.carts);
    })
    this.subscriptions.push(sub);
  }

  searchByDate(){
    let dates=this.searchByDateForm.value;
    console.log(dates);

    let sub = this.cartService.getAllCarts(dates).subscribe((data)=>{
      this.carts = data;
      // console.log(this.carts);
    })
    this.subscriptions.push(sub);
  }

  showModalForDeleteOrViewCart(flag:string, cartIndex:number){
    this.prodsInCartForView = [];
    this.delOrViewCartFlag = flag;
    this.cartIdForDeleteOrView = this.carts[cartIndex].id;

    if(flag == 'cartDetailsFlag'){
      this.viewCart(cartIndex);
    }
    const modal = new (window as any).bootstrap.Modal(this.modalElement.nativeElement);
    modal.show();
    // console.log(this.prodsInCartForView);
  }

  deleteCart(){
    let id = this.cartIdForDeleteOrView;

    let sub = this.cartService.deleteCart(id).subscribe((data)=>{
      console.log(data);
      this.getAllCarts();
    })
    this.subscriptions.push(sub);
  }

  viewCart(index:number){
    let detailedCart = this.carts[index];
    console.log(detailedCart);
    let prodsInCart=detailedCart.products;

    prodsInCart.forEach((element: { productId: number; quantity: number; }) => {
      let sub = this.productService.getProductById(element.productId).subscribe((prod)=>{
        this.prodsInCartForView.push({product:prod, quantity:element.quantity});
        // console.log(prod);
      })
      this.subscriptions.push(sub);
    })
    // console.log(this.prodsInCartForView);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
