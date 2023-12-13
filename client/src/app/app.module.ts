import { BrowserAnimationsModule }        from '@angular/platform-browser/animations'
import { BrowserModule }                  from '@angular/platform-browser'
import { FormsModule }                    from '@angular/forms'
import { NgModule }                       from '@angular/core'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgOptimizedImage }               from '@angular/common'

import { NavComponent }                   from './nav/nav.component'
import { AppComponent }                   from './app.component'
import { AppRoutingModule }               from './app-routing.module'
import { SharedModule }                   from './_modules/shared.module'
import { APP_CONFIG, APP_SERVICE_CONFIG } from './_appconfig/appconfig.service';
import { HomeRoutingModule } from './home/home-routing.module'
import { ErrorInterceptor } from './_middleware/error.interceptor'
import { NgxSpinnerModule } from 'ngx-spinner'



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
    HomeRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ],
  providers: [
    {provide: APP_SERVICE_CONFIG, useValue: APP_CONFIG},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
