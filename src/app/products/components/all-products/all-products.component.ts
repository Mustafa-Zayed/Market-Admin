import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observer, Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { IProduct } from '../../models/iproduct';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  addProductForm: FormGroup;
  base64: any="";
  selectedOption: string = '';
  updateFlag: boolean = false;

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
    this.addProductForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      image: new FormControl(''),
    })
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

  getSelectedCategory(event: any) {
    let category = event.target.value;
    this.addProductForm.get('category')?.setValue(category);
  }

  getImagePath(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      console.log(this.base64)
      this.addProductForm.get('image')?.setValue('');
      this.addProductForm.get('image')?.setValue(this.base64);
    };
  }

  addForm() {
    this.updateFlag = false;
    this.addProductForm.reset();
    this.base64 = '';
    this.selectedOption = '';
  }

  addProduct() {
    let product = this.addProductForm.value;
    console.log(product);

    let sub = this.productService.addNewProduct(product).subscribe((data)=>{
      console.log(data);
    })
    this.subscriptions.push(sub);
  }

  updateForm(product: IProduct) {
    this.updateFlag = true;

    this.addProductForm.patchValue({
      title: product.title,
      description: product.description,
      price: product.price,
    });

    // this.addProductForm.get('category')?.setValue(product.category); // not working as it'sn't an input
    this.selectedOption = product.category;

    this.base64 = product.image; // as the src attribute binds to base64
  }

  updateProduct(productId: number, product: IProduct) {
    let sub = this.productService.updateProduct(productId, product).subscribe((data)=>{
      console.log(data);
    })
    this.subscriptions.push(sub);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
