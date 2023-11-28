import { Component, Inject, OnInit } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Product } from '../../_models/product'
import { PaginatedResult, Pagination } from '../../_models/pagination'
import { map } from 'rxjs'
import { UserParams } from '../../_models/userParams'
import { APP_SERVICE_CONFIG } from '../../_appconfig/appconfig.service'
import { AppConfig } from '../../_appconfig/appconfig.interface'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = []
  userParams: UserParams | undefined
  pagination: Pagination | undefined

  constructor(private http: HttpClient, @Inject(APP_SERVICE_CONFIG) private config: AppConfig,) {
    this.userParams = new UserParams()
  }

  getUserParams() {
    return this.userParams
  }

  setUserParams(params: UserParams) {
    this.userParams = params
  }

  resetUserParams() {
    this.userParams = new UserParams()
  }

  ngOnInit(): void {
    this.loadProducts()
  }

  private loadProducts() {
    if (this.userParams) {
      let params = this.getPaginationHeaders(this.userParams.pageNumber, this.userParams.pageSize)
      if (this.userParams.brandId !== 0) {
        params = params.append('brandId', this.userParams.brandId)
      }

      if (this.userParams.typeId !== 0) {
        params = params.append('typeId', this.userParams.typeId)
      }

      params = params.append('orderBy', this.userParams.orderBy)

      this.getPaginatedResult<Product[]>(this.config.apiUrl + '/products', params).subscribe({
        next: response => {
          if (response.result) {
            this.products = response.result
            this.pagination = response.pagination
          }
        },
        error: error => {
          console.log(error)
        }
      })
    }
  }

  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>()

    return this.http.get<T>(url, {observe: 'response', params}).pipe(
      map(response => {
        if (response.body) {
          paginatedResult.result = response.body
        }

        const pagination = response.headers.get('Pagination')
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination)
        }
        return paginatedResult
      })
    )
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams()

    params = params.append('pageNumber', pageNumber)
    params = params.append('pageSize', pageSize)

    return params
  }

  pageChanged(event: any) {
    if(this.userParams && this.userParams.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page
      this.setUserParams(this.userParams)
      this.loadProducts()
    }
  }

}
