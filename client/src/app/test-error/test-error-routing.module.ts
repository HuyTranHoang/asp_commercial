import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { TestErrorComponent } from './test-error.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { ServerErrorComponent } from './server-error/server-error.component'

const routes: Routes = [
  { path: '', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestErrorRoute { }
