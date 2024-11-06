import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss']
})
export class ProductListPage implements OnInit {
  products: Product[] = [];
  currentSkip = 0;
  hasMoreProducts = true;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(event?: any) {
    this.productService.getProducts(this.currentSkip).subscribe({
      next: (response) => {
        this.products = [...this.products, ...response.products];
        this.currentSkip += 30; // Incrementamos en 30 que es el límite por página
        this.hasMoreProducts = this.currentSkip < response.total;
        
        if (event) {
          event.target.complete();
          if (!this.hasMoreProducts) {
            event.target.disabled = true;
          }
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  logout() {
    // Implementar el logout y redirección
    this.router.navigate(['/login']);
  }
}