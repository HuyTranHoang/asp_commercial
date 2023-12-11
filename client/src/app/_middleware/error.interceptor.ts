import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { NavigationExtras, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastrService: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        switch (err.status) {
          case 400:
            if (err.error.errors) { // case validation error
              const modalStateErrors = []
              for (const key in err.error.errors) {
                if (err.error.errors[key]) {
                  modalStateErrors.push(err.error.errors[key])
                }
              }
              throw modalStateErrors.flat()
            } else { // case generic bad request error
              this.toastrService.error(err.error.message, err.error.statusCode)
            }
            break
          case 401:
            this.router.navigateByUrl('/test-error/unauthorized')
            break
          case 403:
            this.router.navigateByUrl('/test-error/')
            break
          case 404:
            this.router.navigateByUrl('/test-error/not-found')
            break
          case 500:
            const navigationExtras: NavigationExtras = {state: {error: err.error}}
            this.router.navigateByUrl('/test-error/server-error', navigationExtras)
            break
          default:
            break
        }
        const error = err.error.message || err.statusText
        return throwError(error)
      })
    )
  }
}
