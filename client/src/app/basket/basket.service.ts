import { Inject, Injectable } from '@angular/core'
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../_models/basket'
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
  basketTotal: IBasketTotals = {shipping: 0, subtotal: 0, total: 0}

  constructor(
    private http: HttpClient,
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig
  ) {}

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

    const index = basket.items.findIndex((i) => i.id === itemToAdd.id)

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
    return this.http
      .post<IBasket>(this.config.apiUrl + '/basket', basket)
      .subscribe({
        next: (response: IBasket) => {
          this.basket = response
          this.calculateTotals()
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
        this.calculateTotals()
      })
    )
  }

  private calculateTotals() {
    if (this.basket) {
      const shipping = 0
      let subtotal = this.basket.items.reduce(
        (sum, item) => item.price * item.quantity + sum,
        0
      )

      const total = shipping + subtotal
      this.basketTotal = {shipping, total, subtotal}
    }
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue()
    if (basket) {
      const foundItemIndex = basket.items.findIndex((x) => x.id === item.id)
      basket.items[foundItemIndex].quantity++
      this.setBasket(basket)
    }
  }

  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue()
    if (basket) {
      const foundItemIndex = basket.items.findIndex((x) => x.id === item.id)
      if (basket.items[foundItemIndex].quantity > 1) {
        basket.items[foundItemIndex].quantity--
        this.setBasket(basket)
      } else {
        this.removeItemFromBasket(item)
      }
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue()
    if (basket) {
      if (basket.items.some((x) => x.id === item.id)) {
        basket.items = basket.items.filter((i) => i.id !== item.id)
        if (basket.items.length > 0) {
          this.setBasket(basket)
        } else {
          this.deleteBasket(basket)
        }
      }
    }
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.config.apiUrl + '/basket/' + basket.id)
      .subscribe({
        next: () => {
          this.basket = undefined
          this.basketTotal = {shipping: 0, subtotal: 0, total: 0}
          localStorage.removeItem('basket_id')
        },
        error: (error: any) => {
          console.log(error)
        }
      })
  }
}
