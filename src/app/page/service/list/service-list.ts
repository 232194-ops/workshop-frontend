import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Api } from '../../../api/api';
import { serviceGetAll, serviceDelete } from '../../../api/functions';
import { OptionMenuService } from '../../../observable/option-menu/option-menu.service';

@Component({
	selector: 'app-service-list',
	standalone: true,
	imports: [CommonModule, RouterModule, TableModule, ButtonModule],
	template: `
	<div class="page-card">
		<div class="page-header">
			<h2 class="page-title"><i class="pi pi-cog"></i> Servicios</h2>
			<a routerLink="/service/insert"><p-button label="Nuevo Servicio" icon="pi pi-plus" size="small" /></a>
		</div>
		<p-table [value]="services" [loading]="loading" [paginator]="true" [rows]="10"
			responsiveLayout="scroll" styleClass="p-datatable-sm p-datatable-striped">
			<ng-template pTemplate="header">
				<tr><th>Nombre</th><th>Descripción</th><th>Precio</th><th style="width:120px">Acciones</th></tr>
			</ng-template>
			<ng-template pTemplate="body" let-s>
				<tr>
					<td>{{s.name}}</td><td>{{s.description ?? '-'}}</td>
					<td>S/ {{s.price | number:'1.2-2'}}</td>
					<td>
						<div style="display:flex;gap:0.25rem">
							<a [routerLink]="['/service/insert']" [queryParams]="{id: s.idService}">
								<p-button icon="pi pi-pencil" size="small" [text]="true" severity="info" pTooltip="Editar" />
							</a>
							<p-button icon="pi pi-trash" size="small" [text]="true" severity="danger"
								pTooltip="Eliminar" (click)="confirmDelete(s.idService, s.name)" />
						</div>
					</td>
				</tr>
			</ng-template>
			<ng-template pTemplate="emptymessage">
				<tr><td colspan="4" class="text-center p-4">No se encontraron servicios.</td></tr>
			</ng-template>
		</p-table>
	</div>
	`,
	styles: ['.page-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem}']
})
export class ServiceList implements OnInit {
	private api = inject(Api);
	private confirmationService = inject(ConfirmationService);
	private messageService = inject(MessageService);
	private optionMenuService = inject(OptionMenuService);
	services: any[] = []; loading = true;

	ngOnInit(): void { this.optionMenuService.sendData('servicelist'); this.load(); }
	async load(): Promise<void> {
		this.loading = true;
		try { const r: any = await this.api.invoke(serviceGetAll); this.services = r.data ?? []; }
		catch { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los servicios.' }); }
		finally { this.loading = false; }
	}
	confirmDelete(id: string, name: string): void {
		this.confirmationService.confirm({ message: `¿Eliminar servicio <b>${name}</b>?`, header: 'Confirmar Eliminación',
			icon: 'pi pi-exclamation-triangle', acceptButtonStyleClass: 'p-button-danger', accept: () => this.delete(id) });
	}
	async delete(id: string): Promise<void> {
		try { await this.api.invoke(serviceDelete, { id }); this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Servicio eliminado con éxito.' }); this.load(); }
		catch { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el servicio.' }); }
	}
}
