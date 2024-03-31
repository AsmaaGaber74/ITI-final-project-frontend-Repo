import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductServiceService } from '../../services/product-service.service';
import { Iproduct } from '../../models/iproduct';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Iproduct[] = [];
  paginatedProducts: Iproduct[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4; // Adjust based on your preference
  lang: string = 'en'; // Default language

  constructor(
    private router: Router, 
    private productService: ProductServiceService, 
    private translate: TranslateService // Inject TranslateService
  ) {}

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en'; // Initialize language from localStorage
    this.translate.use(this.lang); // Use the language with TranslateService

    // Subscribe to language changes
    this.translate.onLangChange.subscribe(langChangeEvent => {
      this.lang = langChangeEvent.lang;
      // Optionally, refresh data that depends on the current language here
    });

    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.updatePaginatedProducts();
    });
  }

  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  NavigateToDetails(proId:number) {
    this.router.navigateByUrl(`/Details/${proId}`);
  }

  
  getProductName(product: Iproduct): string {
    return this.lang === 'en' ? product.nameEn : product.nameAr;
  }

  getProductDescription(product: Iproduct): string {
    return this.lang === 'en' ? product.descriptionEn : product.descriptionAr;
  }

  getBrandName(product: Iproduct): string {
    return this.lang === 'en' ? product.brandNameEn : product.brandNameAr;
  }
}
