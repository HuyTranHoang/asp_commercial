import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import {
  faPlusCircle,
  faMinusCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  icons = {
    faPlusCircle,
    faMinusCircle,
    faTrash,
  };
  
  constructor(public basketService: BasketService) {}
}
