import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Api } from '../../../api/api';
import { vehicleGetAll, vehicleDelete } from '../../../api/functions';
import { OptionMenuService } from '../../../observable/option-menu/option-menu.service';

@Component({
	selector: 'app-vehicle-list',
	standalone: true,
	imports: [CommonModule, RouterModule, TableModule, ButtonModule],
	templateUrl: './vehicle-list.html',
	styleUrl: './vehicle-list.css'
})
export class VehicleList implements OnInit {
	private api = inject(Api);
	private confirmationService = inject(ConfirmationService);
	private messageService = inject(MessageService);
	private optionMenuService = inject(OptionMenuService);
	private cdr = inject(ChangeDetectorRef);

	vehicles: any[] = [];
	loading = true;

	ngOnInit(): void {
		this.optionMenuService.sendData('vehiclelist');
		this.load();
	}

	async load(): Promise<void> {
		this.loading = true;
		try {
			const r: any = await this.api.invoke(vehicleGetAll);
			this.vehicles = r.data ?? [];
		} catch {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los vehículos.' });
		} finally {
			this.loading = false;
			this.cdr.detectChanges();
		}
	}

	confirmDelete(id: string, plate: string): void {
		this.confirmationService.confirm({
			message: `¿Eliminar vehículo <b>${plate}</b>?`, header: 'Confirmar Eliminación',
			icon: 'pi pi-exclamation-triangle', acceptButtonStyleClass: 'p-button-danger',
			accept: () => this.delete(id)
		});
	}

	async delete(id: string): Promise<void> {
		try {
			await this.api.invoke(vehicleDelete, { id });
			this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Vehículo eliminado con éxito.' });
			this.load();
		} catch {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el vehículo.' });
			this.cdr.detectChanges();
		}
	}
}