import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { PagerComponent } from './pager/pager.component'
import { FormsModule } from '@angular/forms'
import { ToastrModule } from 'ngx-toastr'

@NgModule({
  declarations: [PagerComponent],
  imports: [
    CommonModule,
    FormsModule,

    //Third party module
    PaginationModule.forRoot(),
    FontAwesomeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      tapToDismiss: true,
      preventDuplicates: true
    })
  ],
  exports: [
    PagerComponent,
    PaginationModule,
    FontAwesomeModule,
    ToastrModule
  ]
})
export class SharedModule {}
