import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ShopService } from '../shop.service'
import { Product } from '../../_models/product'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { BasketService } from '../../basket/basket.service'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  faPlusCircle = faPlusCircle
  faMinusCircle = faMinusCircle

  product: Product | undefined = undefined
  quantity = 1

  constructor(private activatedRoute: ActivatedRoute,
              private shopService: ShopService,
              private basketService: BasketService) {}

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.shopService.getProduct(this.activatedRoute.snapshot.params['id'])
      .subscribe(product => this.product = product)
  }

  incrementQuantity() {
    this.quantity++
  }

  decrementQuantity() {
    if (this.quantity > 1) this.quantity--
  }

  addItemToBasket() {
    if (this.product && this.quantity > 0)
      this.basketService.addItemToBasket(this.product, this.quantity)
  }

}
