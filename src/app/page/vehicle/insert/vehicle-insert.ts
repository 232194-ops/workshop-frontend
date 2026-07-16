import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Api } from '../../../api/api';
import { customerGetAll, vehicleGetAll, vehicleInsert, vehicleUpdate } from '../../../api/functions';
import { OptionMenuService } from '../../../observable/option-menu/option-menu.service';

@Component({
	selector: 'app-vehicle-insert',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, InputNumberModule, SelectModule, ButtonModule],
	templateUrl: './vehicle-insert.html',
	styleUrl: './vehicle-insert.css'
})
export class VehicleInsert implements OnInit {
	private fb                = inject(FormBuilder);
	private api               = inject(Api);
	private router            = inject(Router);
	private route             = inject(ActivatedRoute);
	private messageService    = inject(MessageService);
	private optionMenuService = inject(OptionMenuService);

	form!: FormGroup;
	loading   = false;
	isEdit    = false;
	editId    = '';
	customers: any[] = [];

	ngOnInit(): void {
		this.optionMenuService.sendData('vehiclelist');
		this.form = this.fb.group({
			brand:      ['', Validators.required],
			model:      ['', Validators.required],
			year:       [null, Validators.required],
			plate:      ['', Validators.required],
			color:      [''],
			customerId: [null, Validators.required]
		});
		this.loadCustomers();
		const id = this.route.snapshot.queryParams['id'];
		if (id) { this.isEdit = true; this.editId = id; this.loadVehicle(id); }
	}

	async loadCustomers(): Promise<void> {
		try {
			const r: any = await this.api.invoke(customerGetAll);
			this.customers = (r.data ?? []).map((c: any) => ({
				label: `${c.firstName} ${c.surName}`, value: c.idCustomer
			}));
		} catch { }
	}

	async loadVehicle(id: string): Promise<void> {
		try {
			const r: any = await this.api.invoke(vehicleGetAll);
			const found = (r.data ?? []).find((v: any) => v.idVehicle === id);
			if (found) this.form.patchValue({ ...found, customerId: found.customerId });
		} catch { }
	}

	async onSubmit(): Promise<void> {
		if (this.form.invalid) { this.form.markAllAsTouched(); return; }
		this.loading = true;
		try {
			if (this.isEdit) {
				await this.api.invoke(vehicleUpdate, { id: this.editId, body: this.form.value });
				this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Vehículo actualizado con éxito.' });
			} else {
				await this.api.invoke(vehicleInsert, { body: this.form.value });
				this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Vehículo creado con éxito.' });
			}
			this.router.navigate(['/vehicle/list']);
		} catch (err: any) {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'La operación falló.' });
		} finally { this.loading = false; }
	}

	f(n: string) { return this.form.get(n); }
}
