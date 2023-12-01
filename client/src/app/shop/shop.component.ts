import { Component, Inject, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons'
import { APP_SERVICE_CONFIG } from '../_appconfig/appconfig.service'
import { AppConfig } from '../_appconfig/appconfig.interface'

import { ShopService } from './shop.service'

import { Product } from '../_models/product'
import { UserParams } from '../_models/userParams'
import { Pagination } from '../_models/pagination'
import { Brand } from '../_models/brand'
import { Type } from '../_models/type'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  faRefresh = faRefresh
  faSearch = faSearch

  products: Product[] = []
  brands: Brand[] = []
  types: Type[] = []

  pagination: Pagination | undefined
  userParams: UserParams | undefined
  constructor(private http: HttpClient,
              @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
              private shopService: ShopService) {
    this.userParams = shopService.getUserParams()
  }

  ngOnInit(): void {
    this.loadProducts()
    this.loadBrands()
    this.loadTypes()
  }

  loadProducts() {
    if (this.userParams){
      this.shopService.setUserParams(this.userParams)
      this.shopService.getProducts(this.userParams).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.products = response.result
            this.pagination = response.pagination
            console.log(this.pagination)
          }
        },
        error: err => console.log(err)
      })
    }
  }

  loadBrands() {
    this.shopService.getBrands().subscribe({
      next: response => {
        this.brands = [{id: 0, name: 'All'}, ...response]
      },
      error: err => console.log(err)
    })
  }

  loadTypes() {
    this.shopService.getTypes().subscribe({
      next: response => {
        this.types = [{id: 0, name: 'All'}, ...response]
      },
      error: err => console.log(err)
    })
  }

  resetFilters() {
    this.userParams = this.shopService.resetUserParams()
    this.loadProducts()
  }

  pageChanged(event: any) {
    if(this.userParams && this.userParams.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page
      this.shopService.setUserParams(this.userParams)
      this.loadProducts()
    }
  }

}
