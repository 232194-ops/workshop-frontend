import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'auth/login', loadComponent: () => import('./page/auth/login/login').then(m => m.Login) },
	{
		path: '', canActivate: [authGuard], children: [
			{ path: 'home', loadComponent: () => import('./page/home/home').then(m => m.Home) },
			{ path: 'customer/list',     loadComponent: () => import('./page/customer/list/customer-list').then(m => m.CustomerList) },
			{ path: 'customer/insert',   loadComponent: () => import('./page/customer/insert/customer-insert').then(m => m.CustomerInsert) },
			{ path: 'vehicle/list',      loadComponent: () => import('./page/vehicle/list/vehicle-list').then(m => m.VehicleList) },
			{ path: 'vehicle/insert',    loadComponent: () => import('./page/vehicle/insert/vehicle-insert').then(m => m.VehicleInsert) },
			{ path: 'mechanic/list',     loadComponent: () => import('./page/mechanic/list/mechanic-list').then(m => m.MechanicList) },
			{ path: 'mechanic/insert',   loadComponent: () => import('./page/mechanic/insert/mechanic-insert').then(m => m.MechanicInsert) },
			{ path: 'work-order/list',   loadComponent: () => import('./page/work-order/list/work-order-list').then(m => m.WorkOrderList) },
			{ path: 'work-order/insert', loadComponent: () => import('./page/work-order/insert/work-order-insert').then(m => m.WorkOrderInsert) },
			{ path: 'service/list',      loadComponent: () => import('./page/service/list/service-list').then(m => m.ServiceList) },
			{ path: 'service/insert',    loadComponent: () => import('./page/service/insert/service-insert').then(m => m.ServiceInsert) },
			{ path: 'spare-part/list',   loadComponent: () => import('./page/spare-part/list/spare-part-list').then(m => m.SparePartList) },
			{ path: 'spare-part/insert', loadComponent: () => import('./page/spare-part/insert/spare-part-insert').then(m => m.SparePartInsert) },
			{ path: 'invoice/list',      loadComponent: () => import('./page/invoice/list/invoice-list').then(m => m.InvoiceList) },
			{ path: 'invoice/insert',    loadComponent: () => import('./page/invoice/insert/invoice-insert').then(m => m.InvoiceInsert) },
		]
	},
	{ path: '**', redirectTo: 'home' }
];
