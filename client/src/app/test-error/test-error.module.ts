import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestErrorComponent } from './test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { TestErrorRoute } from './test-error-routing.module'




@NgModule({
  declarations: [
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent
  ],
  imports: [
    CommonModule,
    TestErrorRoute
  ]
})
export class TestErrorModule { }
