import { Component, Input } from '@angular/core'

import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { Product } from '../../_models/product'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  faCartPlus = faCartPlus

  @Input() product: Product | undefined

}
