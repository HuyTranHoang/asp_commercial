import { Component, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { APP_SERVICE_CONFIG } from '../_appconfig/appconfig.service'
import { AppConfig } from '../_appconfig/appconfig.interface'

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent {

  validationErrors: string[] = []

  constructor(private http: HttpClient, @Inject(APP_SERVICE_CONFIG) private config: AppConfig) {}

  get404Error() {
    this.http.get(this.config.apiUrl + '/buggy/endpointdoesnotexist').subscribe({
      next: response => {
        console.log(response)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  get500Error() {
    this.http.get(this.config.apiUrl + '/buggy/server-error').subscribe({
      next: response => {
        console.log(response)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  get400Error() {
    this.http.get(this.config.apiUrl + '/buggy/bad-request').subscribe({
      next: response => {
        console.log(response)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  get400ValidationError() {
    this.http.get(this.config.apiUrl + '/buggy/bad-request/one').subscribe({
      next: response => {
        console.log(response)
      },
      error: error => {
        this.validationErrors = error
      }
    })
  }

}
