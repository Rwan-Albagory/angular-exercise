import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService}  from '../../core/core/services/products.service';
import { Product} from '../../core/core/models/product.model';


@Component({
  standalone: true,
  selector: 'app-product-details',
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {

  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  product:Product | null = null;

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );
    
    console.log(id);

    this.productsService.getProductById(id).subscribe({

      next: (product) => {
        console.log('Product:', product);
        this.product = product;
      },
      error: (error) =>
         console.error(
          'Error fetching product:',
           error
          ),
    });
  }
}
