import { InjectionToken } from '@angular/core'
import { AppConfig } from './appconfig.interface'
import { environment } from '../../environments/environment.development'

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config')

export const APP_CONFIG: AppConfig = {
  apiUrl: environment.apiUrl
}
