import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component'
import { SharedModule } from '../_modules/shared.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { FilterComponentComponent } from './filter-component/filter-component.component';

@NgModule({
  declarations: [
    ShopComponent,
    ProductCardComponent,
    FilterComponentComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
