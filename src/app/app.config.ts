import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  CloudUploadOutline,
  SaveOutline,
  MailOutline,
  PhoneOutline
} from '@ant-design/icons-angular/icons';

const icons = [CloudUploadOutline, SaveOutline, MailOutline, PhoneOutline];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideHttpClient(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideNzIcons(icons)
  ]
};
