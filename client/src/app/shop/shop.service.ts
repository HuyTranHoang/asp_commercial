import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { APP_SERVICE_CONFIG } from '../_appconfig/appconfig.service'
import { AppConfig } from '../_appconfig/appconfig.interface'
import { Observable } from 'rxjs'
import { Product } from '../_models/product'

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient, @Inject(APP_SERVICE_CONFIG) private config: AppConfig) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.config.apiUrl + '/products')
  }
}
