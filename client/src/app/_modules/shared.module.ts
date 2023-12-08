import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { PagingFooterComponent } from '../_shared/paging-footer/paging-footer.component'
import { PagerComponent } from '../_shared/pager/pager.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [PagingFooterComponent, PagerComponent,],
  imports: [
    CommonModule,
    FormsModule,

    //Third party module
    PaginationModule.forRoot(),
    FontAwesomeModule,
  ],
  exports: [
    PagingFooterComponent,
    PagerComponent,
    PaginationModule,
    FontAwesomeModule
  ]
})
export class SharedModule {}
