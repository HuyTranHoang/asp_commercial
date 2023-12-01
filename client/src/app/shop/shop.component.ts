import { Component, OnInit } from '@angular/core'
import { ShopService } from './shop.service'
import { faRefresh, faSearch} from '@fortawesome/free-solid-svg-icons'
import { Product } from '../_models/product'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  faRefresh = faRefresh
  faSearch = faSearch

  products: Product[] = []

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response
      },
      error: error => console.log(error)
    })
  }

}
