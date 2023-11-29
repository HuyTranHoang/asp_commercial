import { Component } from '@angular/core'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  faCartShopping = faCartShopping

}
