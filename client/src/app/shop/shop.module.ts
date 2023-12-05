import { NgModule }             from '@angular/core'
import { CommonModule }         from '@angular/common'
import { ShopComponent }        from './shop.component'
import { ProductCardComponent } from './product-card/product-card.component'
import { FilterComponent }      from './filter-component/filter.component'
import { SharedModule }         from '../_modules/shared.module'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [ShopComponent, ProductCardComponent, FilterComponent],
  imports: [CommonModule, FormsModule, SharedModule],
  exports: [ShopComponent]
})
export class ShopModule {}
