import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { OptionMenuService } from '../../observable/option-menu/option-menu.service';
import { AuthService } from '../../observable/auth/auth.service';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, RouterModule, CardModule, ButtonModule],
	templateUrl: './home.html',
	styleUrl: './home.css'
})
export class Home implements OnInit {
	private optionMenuService = inject(OptionMenuService);
	private authService       = inject(AuthService);

	get user(): any { return this.authService.getUser(); }

	cards = [
		{ title: 'Clientes',           icon: 'pi-users',         route: '/customer/list',     color: '#3b82f6' },
		{ title: 'Vehículos',          icon: 'pi-car',           route: '/vehicle/list',      color: '#10b981' },
		{ title: 'Mecánicos',          icon: 'pi-wrench',        route: '/mechanic/list',     color: '#f59e0b' },
		{ title: 'Órdenes de Trabajo', icon: 'pi-clipboard',     route: '/work-order/list',   color: '#6366f1' },
		{ title: 'Servicios',          icon: 'pi-cog',           route: '/service/list',      color: '#ec4899' },
		{ title: 'Repuestos',          icon: 'pi-box',           route: '/spare-part/list',   color: '#14b8a6' },
		{ title: 'Facturas',           icon: 'pi-file-check',    route: '/invoice/list',      color: '#f97316' },
	];

	ngOnInit(): void {
		this.optionMenuService.sendData('home');
	}
}
