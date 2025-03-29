import { InjectionToken } from '@angular/core';
export interface AppSettings {
  title: string;
  version: string;
  apiUrl: string;
}
export const appSettings: AppSettings = {
  title: 'My-Profile-BE',
  version: '1.0',
  apiUrl: 'https://localhost:7039'
};
export const APP_SETTINGS = new InjectionToken<AppSettings>('app.settings');