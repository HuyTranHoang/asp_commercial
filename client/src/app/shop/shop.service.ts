import { BehaviorSubject, map } from 'rxjs'

import { Inject, Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'

import { UserParams } from '../_models/userParams'
import { Type } from '../_models/type'
import { Product } from '../_models/product'
import { PaginatedResult } from '../_models/pagination'
import { Brand } from '../_models/brand'

import { APP_SERVICE_CONFIG } from '../_appconfig/appconfig.service'
import { AppConfig } from '../_appconfig/appconfig.interface'

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private brands$ = new BehaviorSubject<Brand[]>([])
  private types$ = new BehaviorSubject<Type[]>([])
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


  initBrandAndType() {
    this.http.get<Brand[]>(this.config.apiUrl + '/brands')
      .pipe(map(response => [{id: 0, name: 'All'}, ...response]))
      .subscribe({
        next: response => this.brands$.next(response),
        error: err => console.log(err)
      })

    this.http.get<Type[]>(this.config.apiUrl + '/types')
      .pipe(map(response => [{id: 0, name: 'All'}, ...response]))
      .subscribe({
        next: response => this.types$.next(response),
        error: err => console.log(err)
      })
  }

  getBrands() {
    return this.brands$.asObservable()
  }

  getTypes() {
    return this.types$.asObservable()
  }

}
