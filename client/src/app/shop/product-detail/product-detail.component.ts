import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ShopService } from '../shop.service'
import { Product } from '../../_models/product'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  faPlusCircle = faPlusCircle
  faMinusCircle = faMinusCircle

  product: Product | undefined = undefined

  constructor(private activatedRoute: ActivatedRoute, private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.shopService.getProduct(this.activatedRoute.snapshot.params['id'])
      .subscribe(product => this.product = product)
  }

}
