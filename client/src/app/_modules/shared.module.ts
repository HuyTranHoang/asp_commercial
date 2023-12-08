import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { PagingFooterComponent } from '../_shared/paging-footer/paging-footer.component'
import { PagerComponent } from '../_shared/pager/pager.component'

@NgModule({
  declarations: [PagingFooterComponent, PagerComponent,],
  imports: [
    CommonModule,
    //Third party module
    PaginationModule.forRoot(),
    FontAwesomeModule
  ],
  exports: [
    PagingFooterComponent,
    PagerComponent,
    PaginationModule,
    FontAwesomeModule
  ]
})
export class SharedModule {}
