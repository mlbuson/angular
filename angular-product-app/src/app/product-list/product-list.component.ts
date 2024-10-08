import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];

  constructor(private http: HttpClient, private router: Router, private logger: NGXLogger, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.http.get('https://fakestoreapi.com/products').subscribe((data: any) => {
      this.products = data;
      this.filteredProducts = data;
      this.categories = [...new Set(data.map((product: any) => product.category))];
    });
  }

  filterByCategory(category: string): void {
    if (category === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.logger.debug('User logged out');
    this.router.navigate(['/login']);
  }
}
