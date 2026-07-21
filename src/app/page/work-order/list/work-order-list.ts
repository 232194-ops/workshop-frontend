import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Api } from '../../../api/api';
import { workOrderGetAll, workOrderDelete } from '../../../api/functions';
import { OptionMenuService } from '../../../observable/option-menu/option-menu.service';

@Component({
	selector: 'app-work-order-list',
	standalone: true,
	imports: [CommonModule, RouterModule, TableModule, ButtonModule, TagModule],
	templateUrl: './work-order-list.html',
	styleUrl: './work-order-list.css'
})
export class WorkOrderList implements OnInit {
	private api = inject(Api);
	private confirmationService = inject(ConfirmationService);
	private messageService = inject(MessageService);
	private optionMenuService = inject(OptionMenuService);
	private cdr = inject(ChangeDetectorRef);

	orders: any[] = [];
	loading = true;

	statusSeverity: any = {
		PENDING: 'warn', IN_REPAIR: 'info', FINISHED: 'success', DELIVERED: 'secondary'
	};

	statusLabels: any = {
		PENDING: 'Pendiente',
		IN_REPAIR: 'En Reparación',
		FINISHED: 'Finalizado',
		DELIVERED: 'Entregado'
	};

	ngOnInit(): void {
		this.optionMenuService.sendData('workorderlist');
		this.load();
	}

	async load(): Promise<void> {
		this.loading = true;
		try { const r: any = await this.api.invoke(workOrderGetAll); this.orders = r.data ?? []; }
		catch { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las órdenes de trabajo.' }); }
		finally { this.loading = false; this.cdr.detectChanges(); }
	}

	confirmDelete(id: string): void {
		this.confirmationService.confirm({
			message: '¿Está seguro de que desea eliminar esta orden de trabajo?', header: 'Confirmar Eliminación',
			icon: 'pi pi-exclamation-triangle', acceptButtonStyleClass: 'p-button-danger',
			accept: () => this.delete(id)
		});
	}

	async delete(id: string): Promise<void> {
		try {
			await this.api.invoke(workOrderDelete, { id });
			this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Orden de trabajo eliminada con éxito.' });
			this.load();
		} catch { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la orden de trabajo.' }); this.cdr.detectChanges(); }
	}
}