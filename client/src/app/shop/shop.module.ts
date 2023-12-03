import { NgModule }             from '@angular/core'
import { CommonModule }         from '@angular/common'
import { ShopComponent }        from './shop.component'
import { ProductCardComponent } from './product-card/product-card.component'
import { FilterComponent }      from './filter-component/filter.component'
import { SharedModule }         from '../_modules/shared.module'

@NgModule({
  declarations: [ShopComponent, ProductCardComponent, FilterComponent],
  imports: [CommonModule, SharedModule],
  exports: [ShopComponent]
})
export class ShopModule {}
