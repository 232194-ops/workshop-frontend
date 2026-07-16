import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

	private readonly TOKEN_KEY = 'workshop_token';
	private readonly USER_KEY = 'workshop_user';

	saveSession(data: any): void {
		if (!data?.token) {
			console.error('AuthService.saveSession: no se recibió un token válido', data);
			return;
		}
		localStorage.setItem(this.TOKEN_KEY, data.token);
		localStorage.setItem(this.USER_KEY, JSON.stringify(data));
	}

	getToken(): string | null {
		return localStorage.getItem(this.TOKEN_KEY);
	}

	getUser(): any {
		const raw = localStorage.getItem(this.USER_KEY);
		return raw ? JSON.parse(raw) : null;
	}

	isLoggedIn(): boolean {
		return !!this.getToken();
	}

	logout(): void {
		localStorage.removeItem(this.TOKEN_KEY);
		localStorage.removeItem(this.USER_KEY);
	}
}