import { Inject, Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { APP_SERVICE_CONFIG } from '../../_appconfig/appconfig.service'
import { AppConfig } from '../../_appconfig/appconfig.interface'
import { UserParams } from '../../_models/userParams'
import { PaginatedResult, Pagination } from '../../_models/pagination'
import { Product } from '../../_models/product'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  userParams: UserParams | undefined
  pagination: Pagination | undefined

  constructor(private http: HttpClient, @Inject(APP_SERVICE_CONFIG) private config: AppConfig) {
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
    return this.userParams
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

  getProducts(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize)
    if (userParams.brandId !== 0) {
      params = params.append('brandId', userParams.brandId)
    }

    if (userParams.typeId !== 0) {
      params = params.append('typeId', userParams.typeId)
    }

    params = params.append('orderBy', userParams.orderBy)

    return this.getPaginatedResult<Product[]>(this.config.apiUrl + '/products', params)
  }

}
