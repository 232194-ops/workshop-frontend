import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PrimeNG } from 'primeng/config';
import { OptionMenuService } from './observable/option-menu/option-menu.service';
import { AuthService } from './observable/auth/auth.service';
import { delay } from 'rxjs';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, RouterModule, ButtonModule, MenuModule, AvatarModule, ToastModule, ConfirmDialogModule],
	templateUrl: './app.html',
	styleUrls: ['./app.css']
})
export class App implements OnInit {
	private changeDetectorRef = inject(ChangeDetectorRef);
	private messageService    = inject(MessageService);
	private optionMenuService = inject(OptionMenuService);
	private authService       = inject(AuthService);
	private router            = inject(Router);
	private primeng           = inject(PrimeNG);

	menuOptions: any[] = [
		{ id: 'home',            route: '/home',            icon: 'home',         text: 'Inicio',             active: false },
		{ id: 'customerlist',    route: '/customer/list',   icon: 'users',        text: 'Clientes',           active: false },
		{ id: 'vehiclelist',     route: '/vehicle/list',    icon: 'car',          text: 'Vehículos',          active: false },
		{ id: 'mechaniclist',    route: '/mechanic/list',   icon: 'wrench',       text: 'Mecánicos',          active: false },
		{ id: 'workorderlist',   route: '/work-order/list', icon: 'clipboard',    text: 'Órdenes de Trabajo', active: false },
		{ id: 'servicelist',     route: '/service/list',    icon: 'cog',          text: 'Servicios',          active: false },
		{ id: 'sparepartlist',   route: '/spare-part/list', icon: 'box',          text: 'Repuestos',          active: false },
		{ id: 'invoicelist',     route: '/invoice/list',    icon: 'file-check',   text: 'Facturas',           active: false },
	];

	profileItems: MenuItem[] = [
		{ label: 'Mi Perfil', icon: 'pi pi-user' },
		{ separator: true },
		{ label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
	];

	get isLoggedIn(): boolean { return this.authService.isLoggedIn(); }
	get currentUser(): any    { return this.authService.getUser(); }

	ngOnInit(): void {
		this.primeng.setTranslation({
			accept: 'Aceptar',
			reject: 'Cancelar',
			dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
			dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
			dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
			monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
			today: 'Hoy',
			clear: 'Limpiar',
			weekHeader: 'Sm'
		});

		this.optionMenuService.data$().pipe(delay(0)).subscribe({
			next: (response: any) => {
				this.menuOptions.map(x => x.active = false);
				this.menuOptions.every((element: any) => {
					if (element.id == response) { element.active = true; return false; }
					return true;
				});
				this.changeDetectorRef.markForCheck();
				this.changeDetectorRef.detectChanges();
			}
		});
	}

	logout(): void {
		this.authService.logout();
		this.messageService.add({ severity: 'info', summary: 'Sesión cerrada', detail: 'La sesión se cerró correctamente.', life: 3000 });
		this.router.navigate(['/auth/login']);
	}
}
