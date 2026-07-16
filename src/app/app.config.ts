import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideApiConfiguration } from './api/api-configuration';
import { environment } from './environments/environments';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { ConfirmationService, MessageService } from 'primeng/api';
import { authInterceptor } from './interceptor/auth.interceptor';

const WorkshopPreset = definePreset(Aura, {
	semantic: {
		primary: {
			50: '{slate.50}', 100: '{slate.100}', 200: '{slate.200}',
			300: '{slate.300}', 400: '{slate.400}', 500: '{slate.900}',
			600: '{slate.800}', 700: '{slate.700}', 800: '{slate.600}',
			900: '{slate.500}', 950: '{slate.400}'
		}
	}
});

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideHttpClient(withInterceptors([authInterceptor])),
		provideApiConfiguration(environment.urlBase),
		providePrimeNG({
			theme: { preset: WorkshopPreset, options: { darkModeSelector: '.my-app-dark' } }
		}),
		MessageService,
		ConfirmationService
	]
};
