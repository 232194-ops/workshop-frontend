import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Api } from '../../../api/api';
import { vehicleGetAll, mechanicGetAll, workOrderGetAll, workOrderInsert, workOrderUpdate } from '../../../api/functions';
import { OptionMenuService } from '../../../observable/option-menu/option-menu.service';

@Component({
	selector: 'app-work-order-insert',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, TextareaModule, SelectModule, DatePickerModule, ButtonModule],
	templateUrl: './work-order-insert.html',
	styleUrl: './work-order-insert.css'
})
export class WorkOrderInsert implements OnInit {
	private fb                = inject(FormBuilder);
	private api               = inject(Api);
	private router            = inject(Router);
	private route             = inject(ActivatedRoute);
	private messageService    = inject(MessageService);
	private optionMenuService = inject(OptionMenuService);

	form!: FormGroup;
	loading = false; isEdit = false; editId = '';
	vehicles:  any[] = [];
	mechanics: any[] = [];
	statuses = [
		{ label: 'Pendiente',     value: 'PENDING' },
		{ label: 'En Reparación', value: 'IN_REPAIR' },
		{ label: 'Finalizado',    value: 'FINISHED' },
		{ label: 'Entregado',     value: 'DELIVERED' }
	];

	ngOnInit(): void {
		this.optionMenuService.sendData('workorderlist');
		this.form = this.fb.group({
			entryDate:          [new Date(), Validators.required],
			problemDescription: ['', Validators.required],
			diagnosis:          [''],
			status:             ['PENDING', Validators.required],
			vehicleId:          [null, Validators.required],
			mechanicId:         [null]
		});
		this.loadDropdowns();
		const id = this.route.snapshot.queryParams['id'];
		if (id) { this.isEdit = true; this.editId = id; this.loadOrder(id); }
	}

	async loadDropdowns(): Promise<void> {
		try {
			const [vr, mr]: any[] = await Promise.all([
				this.api.invoke(vehicleGetAll),
				this.api.invoke(mechanicGetAll)
			]);
			this.vehicles  = (vr.data ?? []).map((v: any) => ({ label: `${v.plate} - ${v.brand} ${v.model}`, value: v.idVehicle }));
			this.mechanics = (mr.data ?? []).map((m: any) => ({ label: m.firstName, value: m.idMechanic }));
		} catch { }
	}

	async loadOrder(id: string): Promise<void> {
		try {
			const r: any = await this.api.invoke(workOrderGetAll);
			const found = (r.data ?? []).find((o: any) => o.idWorkOrder === id);
			if (found) {
				this.form.patchValue({
					...found,
					entryDate: new Date(found.entryDate),
					vehicleId:  found.vehicleId,
					mechanicId: found.mechanicId
				});
			}
		} catch { }
	}

	async onSubmit(): Promise<void> {
		if (this.form.invalid) { this.form.markAllAsTouched(); return; }
		this.loading = true;
		const val = this.form.value;
		const body = { ...val, entryDate: (val.entryDate as Date).toISOString() };
		try {
			if (this.isEdit) {
				await this.api.invoke(workOrderUpdate, { id: this.editId, body });
				this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Orden de trabajo actualizada con éxito.' });
			} else {
				await this.api.invoke(workOrderInsert, { body });
				this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Orden de trabajo creada con éxito.' });
			}
			this.router.navigate(['/work-order/list']);
		} catch (err: any) {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'La operación falló.' });
		} finally { this.loading = false; }
	}

	f(n: string) { return this.form.get(n); }
}
