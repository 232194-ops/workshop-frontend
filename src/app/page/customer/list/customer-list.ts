import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Api } from '../../../api/api';
import { customerGetAll, customerDelete } from '../../../api/functions';
import { OptionMenuService } from '../../../observable/option-menu/option-menu.service';

@Component({
	selector: 'app-customer-list',
	standalone: true,
	imports: [CommonModule, RouterModule, TableModule, ButtonModule, TagModule, ConfirmDialogModule, ToastModule],
	templateUrl: './customer-list.html',
	styleUrl: './customer-list.css'
})
export class CustomerList implements OnInit {
	private api                 = inject(Api);
	private confirmationService = inject(ConfirmationService);
	private messageService      = inject(MessageService);
	private optionMenuService   = inject(OptionMenuService);

	customers: any[] = [];
	loading = true;

	ngOnInit(): void {
		this.optionMenuService.sendData('customerlist');
		this.loadCustomers();
	}

	async loadCustomers(): Promise<void> {
		this.loading = true;
		try {
			const response: any = await this.api.invoke(customerGetAll);
			this.customers = response.data ?? [];
		} catch {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los clientes.' });
		} finally {
			this.loading = false;
		}
	}

	confirmDelete(id: string, name: string): void {
		this.confirmationService.confirm({
			message: `¿Está seguro de que desea eliminar a <b>${name}</b>?`,
			header: 'Confirmar Eliminación',
			icon: 'pi pi-exclamation-triangle',
			acceptButtonStyleClass: 'p-button-danger',
			accept: () => this.deleteCustomer(id)
		});
	}

	async deleteCustomer(id: string): Promise<void> {
		try {
			await this.api.invoke(customerDelete, { id });
			this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Cliente eliminado con éxito.' });
			this.loadCustomers();
		} catch {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar al cliente.' });
		}
	}
}
