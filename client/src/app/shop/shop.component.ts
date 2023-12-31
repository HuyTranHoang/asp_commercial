import { Component, OnInit } from '@angular/core';

import { ShopService } from './shop.service';

import { UserParams } from '../_models/userParams';
import { Type } from '../_models/type';
import { Product } from '../_models/product';
import { Pagination } from '../_models/pagination';
import { Brand } from '../_models/brand';

import { faSearch, faRefresh } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  icons = {
    faRefresh,
    faSearch,
  };

  sortList = [
    { value: 'name', display: 'Name: A to Z' },
    { value: 'priceAsc', display: 'Price: Low to High' },
    { value: 'priceDesc', display: 'Price: High to Low' },
  ];

  searchTerm = '';

  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];

  pagination: Pagination | undefined;
  userParams: UserParams | undefined;

  constructor(private shopService: ShopService) {
    this.userParams = this.shopService.getUserParams();
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadBrands();
    this.loadTypes();
  }

  loadProducts() {
    if (this.userParams) {
      this.shopService.setUserParams(this.userParams);
      this.shopService.getProducts(this.userParams).subscribe({
        next: (response) => {
          if (response.result && response.pagination) {
            this.products = response.result;
            this.pagination = response.pagination;
          }
        },
        error: (err) => console.log(err),
      });
    }
  }

  loadBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      error: (err) => console.log(err),
    });
  }

  loadTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      error: (err) => console.log(err),
    });
  }

  resetFilters() {
    this.userParams = new UserParams();
    this.shopService.setUserParams(this.userParams);
    this.loadProducts();
  }

  pageChanged(pageNumber: number) {
    if (this.userParams && this.userParams.pageNumber !== pageNumber) {
      this.userParams.pageNumber = pageNumber;
      this.shopService.setUserParams(this.userParams);
      this.loadProducts();
    }
  }

  onBrandSelected(brandId: number) {
    if (this.userParams && this.userParams.brandId !== brandId) {
      this.userParams.brandId = brandId;
      this.userParams.pageNumber = 1;
      this.shopService.setUserParams(this.userParams);
      this.loadProducts();
    }
  }

  onTypeSelected(typeId: number) {
    if (this.userParams && this.userParams.typeId !== typeId) {
      this.userParams.typeId = typeId;
      this.userParams.pageNumber = 1;
      this.shopService.setUserParams(this.userParams);
      this.loadProducts();
    }
  }

  onSortSelected(sort: string) {
    if (this.userParams && this.userParams.sort !== sort) {
      this.userParams.sort = sort;
      this.userParams.pageNumber = 1;
      this.shopService.setUserParams(this.userParams);
      this.loadProducts();
    }
  }

  onSearch() {
    if (this.userParams) {
      this.userParams.search = this.searchTerm;
      this.loadProducts();
    }
  }

  onResetSearch() {
    this.searchTerm = '';
    this.onSearch();
  }
}
