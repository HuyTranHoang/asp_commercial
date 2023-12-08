import { Component, Input } from '@angular/core'
import { Pagination } from '../../_models/pagination'

@Component({
  selector: 'app-paging-footer',
  templateUrl: './paging-footer.component.html',
  styleUrls: ['./paging-footer.component.scss']
})
export class PagingFooterComponent {

  @Input() pagination: Pagination | undefined

  getMax(currentPage: number, itemsPerPage: number, totalItems: number) {
    return Math.min(currentPage * itemsPerPage, totalItems)
  }
}
