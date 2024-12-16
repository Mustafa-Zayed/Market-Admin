import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct ;
  prodId: number = 0;
  loading: boolean = false;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.prodId = +(this.activatedRoute.snapshot.paramMap.get('id') || 0);

    this.getProductById();
  }

  getProductById() {
    this.loading = true;
    this.productService.getProductById(this.prodId).subscribe((data) => {
      this.product = data;
      this.loading = false;
    });
  }
}
