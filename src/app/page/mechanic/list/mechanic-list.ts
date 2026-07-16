import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Api } from '../../../api/api';
import { mechanicGetAll, mechanicDelete } from '../../../api/functions';
import { OptionMenuService } from '../../../observable/option-menu/option-menu.service';

@Component({
	selector: 'app-mechanic-list',
	standalone: true,
	imports: [CommonModule, RouterModule, TableModule, ButtonModule],
	templateUrl: './mechanic-list.html',
	styleUrl: './mechanic-list.css'
})
export class MechanicList implements OnInit {
	private api                 = inject(Api);
	private confirmationService = inject(ConfirmationService);
	private messageService      = inject(MessageService);
	private optionMenuService   = inject(OptionMenuService);

	mechanics: any[] = [];
	loading = true;

	ngOnInit(): void {
		this.optionMenuService.sendData('mechaniclist');
		this.load();
	}

	async load(): Promise<void> {
		this.loading = true;
		try { const r: any = await this.api.invoke(mechanicGetAll); this.mechanics = r.data ?? []; }
		catch { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los mecánicos.' }); }
		finally { this.loading = false; }
	}

	confirmDelete(id: string, name: string): void {
		this.confirmationService.confirm({
			message: `¿Eliminar mecánico <b>${name}</b>?`, header: 'Confirmar Eliminación',
			icon: 'pi pi-exclamation-triangle', acceptButtonStyleClass: 'p-button-danger',
			accept: () => this.delete(id)
		});
	}

	async delete(id: string): Promise<void> {
		try {
			await this.api.invoke(mechanicDelete, { id });
			this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Mecánico eliminado con éxito.' });
			this.load();
		} catch { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el mecánico.' }); }
	}
}
