import { Component, Inject, OnInit } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Product } from '../_models/product'
import { PaginatedResult, Pagination } from '../_models/pagination'
import { map } from 'rxjs'
import { UserParams } from '../_models/userParams'
import { APP_SERVICE_CONFIG } from '../_appconfig/appconfig.service'
import { AppConfig } from '../_appconfig/appconfig.interface'
import { ProductService } from '../_services/product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = []
  userParams: UserParams | undefined
  pagination: Pagination | undefined

  constructor(private http: HttpClient,
              @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
              private productService: ProductService) {
    this.userParams = new UserParams()
  }

  ngOnInit(): void {
    this.loadProducts()
  }

  private loadProducts() {
    if (this.userParams){
      this.productService.setUserParams(this.userParams)
      this.productService.getProducts(this.userParams).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.products = response.result
            this.pagination = response.pagination
          }
        },
        error: error => console.log(error)
      })
    }
  }

  resetFilters() {
    this.userParams = this.productService.resetUserParams()
    this.loadProducts()
  }

  pageChanged(event: any) {
    if (this.userParams && this.userParams.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page
      this.productService.setUserParams(this.userParams)
      this.loadProducts()
    }
  }

}
