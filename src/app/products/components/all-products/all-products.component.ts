import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observer, Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  categories: string[] = [];
  subscriptions: Subscription[] = [];
  private productObserver: Observer<Object>;
  loading: boolean = false;

  /**
   * When { static: false } is used (default in most cases), Angular initializes the @ViewChild 
   * reference after the view is rendered.
   * This means you don’t need to explicitly implement AfterViewInit unless you want to interact
   * with the @ViewChild property as soon as it is initialized.
   * Since the modal is only shown when showModal() is called (a user action or another event), 
   * the modalElement is already initialized by the time you access 
   */
  @ViewChild('modalId') modalElement!: ElementRef;
  // Properties to hold modal data
  product: IProduct = {} as IProduct;
  quantity: number = 0;

  constructor(private productService: ProductService, private categoryService:CategoryService) {
    this.productObserver = {
      next: (data:any) => {
        this.products = data;
        this.loading = false;
      },

      error: (err: Error) => {
        this.loading = false;
        console.log(err.message);
        alert('Failed to Get Products');
      },
      complete: () => console.log('Completed!'),
    };
  }

  ngOnInit(): void {
    // console.log('All Product Component');
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.loading = true;
    let sub = this.productService.getAllProducts().subscribe(this.productObserver);

    this.subscriptions.push(sub);
  }
  
  getAllCategories() {
    this.loading = true;
    let sub = this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });

    this.subscriptions.push(sub);
  }

  // getByCategory(category: string) {
  //   this.loading = true;
  //   if (category === 'all') {
  //     this.getAllProducts();
  //     return;
  //   }
  //   let sub = this.categoryService.getByCategory(category).subscribe(this.productObserver);

  //   this.subscriptions.push(sub);
  // }

  getByCategory(event: any) {
    this.loading = true;
    let category = event.target.value;

    if (category === 'all') {
      this.getAllProducts();
      return;
    }
    let sub = this.categoryService.getByCategory(category).subscribe(this.productObserver);

    this.subscriptions.push(sub);
  }

  addToCart(event: { product: IProduct, quantity: number }) {
    this.productService.addToCart(event);
    this.showAddedToCartModal(event);
  }

  private showAddedToCartModal(event: { product: IProduct, quantity: number }) {
    this.product = event.product;
    this.quantity = event.quantity;

    const modal = new (window as any).bootstrap.Modal(this.modalElement.nativeElement);
    modal.show();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
