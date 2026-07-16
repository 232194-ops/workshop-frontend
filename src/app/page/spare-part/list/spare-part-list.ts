import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Api } from '../../../api/api';
import { sparePartGetAll, sparePartDelete } from '../../../api/functions';
import { OptionMenuService } from '../../../observable/option-menu/option-menu.service';

@Component({
	selector: 'app-spare-part-list',
	standalone: true,
	imports: [CommonModule, RouterModule, TableModule, ButtonModule, TagModule],
	template: `
	<div class="page-card">
		<div class="page-header">
			<h2 class="page-title"><i class="pi pi-box"></i> Repuestos</h2>
			<a routerLink="/spare-part/insert"><p-button label="Nuevo Repuesto" icon="pi pi-plus" size="small" /></a>
		</div>
		<p-table [value]="parts" [loading]="loading" [paginator]="true" [rows]="10"
			responsiveLayout="scroll" styleClass="p-datatable-sm p-datatable-striped">
			<ng-template pTemplate="header">
				<tr><th>Nombre</th><th>Marca</th><th>Precio</th><th>Stock</th><th style="width:120px">Acciones</th></tr>
			</ng-template>
			<ng-template pTemplate="body" let-p>
				<tr>
					<td>{{p.name}}</td>
					<td>{{p.brand ?? '-'}}</td>
					<td>S/ {{p.price | number:'1.2-2'}}</td>
					<td>
						<p-tag [value]="p.stock === 0 ? 'Sin stock' : p.stock + ' und.'"
							[severity]="p.stock === 0 ? 'danger' : p.stock < 5 ? 'warn' : 'success'" />
					</td>
					<td>
						<div style="display:flex;gap:0.25rem">
							<a [routerLink]="['/spare-part/insert']" [queryParams]="{id: p.idSparePart}">
								<p-button icon="pi pi-pencil" size="small" [text]="true" severity="info" pTooltip="Editar" />
							</a>
							<p-button icon="pi pi-trash" size="small" [text]="true" severity="danger"
								pTooltip="Eliminar" (click)="confirmDelete(p.idSparePart, p.name)" />
						</div>
					</td>
				</tr>
			</ng-template>
			<ng-template pTemplate="emptymessage">
				<tr><td colspan="5" class="text-center p-4">No se encontraron repuestos.</td></tr>
			</ng-template>
		</p-table>
	</div>
	`,
	styles: ['.page-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem}']
})
export class SparePartList implements OnInit {
	private api                 = inject(Api);
	private confirmationService = inject(ConfirmationService);
	private messageService      = inject(MessageService);
	private optionMenuService   = inject(OptionMenuService);

	parts: any[] = [];
	loading = true;

	ngOnInit(): void {
		this.optionMenuService.sendData('sparepartlist');
		this.load();
	}

	async load(): Promise<void> {
		this.loading = true;
		try {
			const r: any = await this.api.invoke(sparePartGetAll);
			this.parts = r.data ?? [];
		} catch {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los repuestos.' });
		} finally { this.loading = false; }
	}

	confirmDelete(id: string, name: string): void {
		this.confirmationService.confirm({
			message: `¿Eliminar repuesto <b>${name}</b>?`,
			header: 'Confirmar Eliminación',
			icon: 'pi pi-exclamation-triangle',
			acceptButtonStyleClass: 'p-button-danger',
			accept: () => this.delete(id)
		});
	}

	async delete(id: string): Promise<void> {
		try {
			await this.api.invoke(sparePartDelete, { id });
			this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Repuesto eliminado con éxito.' });
			this.load();
		} catch {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el repuesto.' });
		}
	}
}
