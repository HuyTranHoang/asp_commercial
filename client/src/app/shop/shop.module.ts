import { FormsModule }            from '@angular/forms';
import { NgModule }               from '@angular/core'
import { CommonModule }           from '@angular/common'

import { ShopComponent }          from './shop.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { ProductCardComponent }   from './product-card/product-card.component'
import { FilterComponent }        from './filter-component/filter.component'
import { SharedModule }           from '../_modules/shared.module'
import { ShopRoutingModule } from './shop-routing.module'


@NgModule({
  declarations: [
    FilterComponent,
    ProductCardComponent,
    ProductDetailComponent,
    ShopComponent,
  ],
  imports: [CommonModule, FormsModule, SharedModule, ShopRoutingModule],
  exports: [ShopComponent]
})
export class ShopModule {}
