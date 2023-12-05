import { BrowserAnimationsModule }        from '@angular/platform-browser/animations'
import { BrowserModule }                  from '@angular/platform-browser'
import { FormsModule }                    from '@angular/forms'
import { NgModule }                       from '@angular/core'
import { HttpClientModule }               from '@angular/common/http'
import { NgOptimizedImage }               from '@angular/common'

import { ShopModule }                     from './shop/shop.module'
import { NavComponent }                   from './nav/nav.component'
import { AppComponent }                   from './app.component'
import { AppRoutingModule }               from './app-routing.module'
import { SharedModule }                   from './_modules/shared.module'
import { APP_CONFIG, APP_SERVICE_CONFIG } from './_appconfig/appconfig.service'


@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    SharedModule,
    ShopModule
  ],
  providers: [
    { provide: APP_SERVICE_CONFIG, useValue: APP_CONFIG },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
