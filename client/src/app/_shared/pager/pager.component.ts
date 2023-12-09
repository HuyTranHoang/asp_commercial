import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Pagination } from '../../_models/pagination'
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {

  @Input() pagination: Pagination | undefined
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>()

  icons = {
    faAngleRight,
    faAnglesRight,
    faAngleLeft,
    faAnglesLeft
  };
  constructor() { }

  pageChangedEvent(event: any) {
    this.pageChanged.emit(event.page)
  }

  getMax(currentPage: number, itemsPerPage: number, totalItems: number) {
    return Math.min(currentPage * itemsPerPage, totalItems)
  }
}
