import { Component } from '@angular/core';

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(public basketService: BasketService) {}
  faCartShopping = faCartShopping;
}
