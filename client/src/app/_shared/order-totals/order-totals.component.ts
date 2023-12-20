import { Component } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss'],
})
export class OrderTotalsComponent {
  icons = {
    faShoppingCart,
  };
  constructor(public basketService: BasketService) {}
}
