import { Inject, Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { APP_SERVICE_CONFIG } from '../_appconfig/appconfig.service'
import { AppConfig } from '../_appconfig/appconfig.interface'
import { map } from 'rxjs'
import { Product } from '../_models/product'
import { UserParams } from '../_models/userParams'
import { PaginatedResult, Pagination } from '../_models/pagination'

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  userParams: UserParams | undefined

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

    if (userParams.search) {
      params = params.append('search', userParams.search)
    }

    params = params.append('sort', userParams.sort)

    return this.getPaginatedResult<Product[]>(this.config.apiUrl + '/products', params)
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.config.apiUrl + '/products/' + id)
  }

  getBrands() {
    return this.http.get<[]>(this.config.apiUrl + '/brands')
  }

  getTypes() {
    return this.http.get<[]>(this.config.apiUrl + '/types')
  }

}
