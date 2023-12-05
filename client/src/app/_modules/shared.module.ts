import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //Third party module
    PaginationModule.forRoot(),
    FontAwesomeModule
  ],
  exports: [
    PaginationModule,
    FontAwesomeModule
  ]
})
export class SharedModule {}
