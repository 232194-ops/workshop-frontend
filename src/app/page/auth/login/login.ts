import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { Api } from '../../../api/api';
import { authLogin } from '../../../api/functions';
import { AuthService } from '../../../observable/auth/auth.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, MessageModule],
	templateUrl: './login.html',
	styleUrl: './login.css'
})
export class Login implements OnInit {
	private fb = inject(FormBuilder);
	private api = inject(Api);
	private router = inject(Router);
	private authSvc = inject(AuthService);

	form!: FormGroup;
	loading = false;
	errorMessage = '';

	ngOnInit(): void {
		if (this.authSvc.isLoggedIn()) {
			this.router.navigate(['/home']);
		}
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	async onSubmit(): Promise<void> {
		if (this.form.invalid) { this.form.markAllAsTouched(); return; }
		this.loading = true;
		this.errorMessage = '';
		try {
			const response: any = await this.api.invoke(authLogin, {
				body: { email: this.form.value.email, password: this.form.value.password }
			});
			const data = response?.data ?? response;
			this.authSvc.saveSession(data);
			this.router.navigate(['/home']);
		} catch (err: any) {
			this.errorMessage = err?.error?.message || 'Credenciales inválidas. Por favor, intente de nuevo.';
		} finally {
			this.loading = false;
		}
	}

	get email() { return this.form.get('email'); }
	get password() { return this.form.get('password'); }
}