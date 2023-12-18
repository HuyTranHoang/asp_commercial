import { Inject, Injectable } from '@angular/core'
import { Basket, IBasket, IBasketItem } from '../_models/basket'
import { Product } from '../_models/product'
import { APP_SERVICE_CONFIG } from '../_appconfig/appconfig.service'
import { AppConfig } from '../_appconfig/appconfig.interface'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basket: IBasket | undefined

  constructor(
    private http: HttpClient,
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig) { }

  addItemToBasket(item: Product, quantity = 1) {
    const itemToAdd: IBasketItem = {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity,
      pictureUrl: item.pictureUrl,
      type: item.productTypeName,
      brand: item.productBrandName
    }

    const basket: IBasket = this.getCurrentBasketValue() ?? this.createBasket()

    const index = basket.items.findIndex(i => i.id === itemToAdd.id)

    if (index === -1) {
      basket.items.push(itemToAdd)
    } else {
      basket.items[index].quantity += quantity
    }

    this.setBasket(basket)
  }

  createBasket(): IBasket {
    const basket = new Basket()
    localStorage.setItem('basket_id', basket.id)
    return basket
  }

  getCurrentBasketValue(): IBasket | undefined {
    return this.basket
  }

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.config.apiUrl + '/basket', basket).subscribe({
      next: (response: IBasket) => {
        this.basket = response
        console.log(response)
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  getBasket(id: string) {
    return this.http.get<IBasket>(this.config.apiUrl + '/basket/' + id).pipe(
      map((basket: IBasket) => {
        this.basket = basket
      })
    )
  }

}
