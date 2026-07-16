import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Api } from '../../../api/api';
import { invoiceGetAll, invoiceDelete } from '../../../api/functions';
import { OptionMenuService } from '../../../observable/option-menu/option-menu.service';

@Component({
	selector: 'app-invoice-list',
	standalone: true,
	imports: [CommonModule, RouterModule, TableModule, ButtonModule],
	templateUrl: './invoice-list.html',
	styleUrl: './invoice-list.css'
})
export class InvoiceList implements OnInit {
	private api = inject(Api);
	private confirmationService = inject(ConfirmationService);
	private messageService = inject(MessageService);
	private optionMenuService = inject(OptionMenuService);

	invoices: any[] = [];
	loading = true;
	expandedRows: { [key: string]: boolean } = {};

	ngOnInit(): void {
		this.optionMenuService.sendData('invoicelist');
		this.load();
	}

	async load(): Promise<void> {
		this.loading = true;
		try {
			const r: any = await this.api.invoke(invoiceGetAll);
			this.invoices = r.data ?? [];
		} catch {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las facturas.' });
		} finally { this.loading = false; }
	}

	confirmDelete(id: string): void {
		this.confirmationService.confirm({
			message: '¿Está seguro de que desea eliminar esta factura?',
			header: 'Confirmar Eliminación',
			icon: 'pi pi-exclamation-triangle',
			acceptButtonStyleClass: 'p-button-danger',
			accept: () => this.delete(id)
		});
	}

	async delete(id: string): Promise<void> {
		try {
			await this.api.invoke(invoiceDelete, { id });
			this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Factura eliminada con éxito.' });
			this.load();
		} catch {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la factura.' });
		}
	}
}