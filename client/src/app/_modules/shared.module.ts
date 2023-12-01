import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //Angular module
    FormsModule,
    //Third party module
    PaginationModule.forRoot(),
    FontAwesomeModule
  ],
  exports: [
    FormsModule,
    PaginationModule,
    FontAwesomeModule
  ]
})
export class SharedModule {}
