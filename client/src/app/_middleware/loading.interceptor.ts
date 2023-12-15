import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { delay, finalize, Observable } from 'rxjs'
import { BusyService } from '../_shared/services/busy.service'

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.busyService.busy()
    return next.handle(request).pipe(
      // tap(() => {
      //   this.busyService.idle()
      // }),
      delay(2000),
      finalize(() => this.busyService.idle())
    )
  }
}
