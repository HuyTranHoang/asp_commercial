import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PagerComponent } from './pager/pager.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { OrderTotalsComponent } from './order-totals/order-totals.component';

@NgModule({
  declarations: [PagerComponent, OrderTotalsComponent],
  imports: [
    CommonModule,
    FormsModule,

    //Third party module
    PaginationModule.forRoot(),
    FontAwesomeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      tapToDismiss: true,
      preventDuplicates: true,
    }),
  ],
  exports: [
    PagerComponent,
    OrderTotalsComponent,
    PaginationModule,
    FontAwesomeModule,
    ToastrModule,
  ],
})
export class SharedModule {}
