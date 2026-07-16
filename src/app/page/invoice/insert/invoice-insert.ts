import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';
import { Api } from '../../../api/api';
import { customerGetAll, serviceGetAll, sparePartGetAll, workOrderGetAll, invoiceInsert } from '../../../api/functions';
import { OptionMenuService } from '../../../observable/option-menu/option-menu.service';

@Component({
	selector: 'app-invoice-insert',
	standalone: true,
	imports: [
		CommonModule, ReactiveFormsModule, RouterModule,
		InputTextModule, InputNumberModule, SelectModule,
		DatePickerModule, ButtonModule, DividerModule
	],
	templateUrl: './invoice-insert.html',
	styleUrl: './invoice-insert.css'
})
export class InvoiceInsert implements OnInit {
	private fb                = inject(FormBuilder);
	private api               = inject(Api);
	private router            = inject(Router);
	private messageService    = inject(MessageService);
	private optionMenuService = inject(OptionMenuService);

	form!: FormGroup;
	loading = false;

	customers:  any[] = [];
	services:   any[] = [];
	spareParts: any[] = [];
	workOrders: any[] = [];

	typeOptions = [
		{ label: 'Servicio',    value: 'service' },
		{ label: 'Repuesto', value: 'sparePart' }
	];

	ngOnInit(): void {
		this.optionMenuService.sendData('invoicelist');
		this.form = this.fb.group({
			issueDate:  [new Date(), Validators.required],
			customerId: [null, Validators.required],
			details:    this.fb.array([])
		});
		this.loadDropdowns();
		this.addDetail();
	}

	async loadDropdowns(): Promise<void> {
		try {
			const [cr, sr, pr, wr]: any[] = await Promise.all([
				this.api.invoke(customerGetAll),
				this.api.invoke(serviceGetAll),
				this.api.invoke(sparePartGetAll),
				this.api.invoke(workOrderGetAll)
			]);
			const statusTranslations: any = {
				PENDING: 'Pendiente',
				IN_REPAIR: 'En Reparación',
				FINISHED: 'Finalizado',
				DELIVERED: 'Entregado'
			};
			this.customers  = (cr.data ?? []).map((c: any) => ({ label: `${c.firstName} ${c.surName}`, value: c.idCustomer }));
			this.services   = (sr.data ?? []).map((s: any) => ({ label: `${s.name} (S/ ${s.price})`, value: s.idService }));
			this.spareParts = (pr.data ?? []).map((p: any) => ({ label: `${p.name} - ${p.brand ?? ''} (Stock: ${p.stock})`, value: p.idSparePart }));
			this.workOrders = (wr.data ?? []).map((o: any) => ({ label: `${o.vehiclePlate} - ${statusTranslations[o.status] || o.status}`, value: o.idWorkOrder }));
		} catch { }
	}

	get detailsArray(): FormArray {
		return this.form.get('details') as FormArray;
	}

	addDetail(): void {
		const group = this.fb.group({
			concept:     ['', Validators.required],
			quantity:    [1, [Validators.required, Validators.min(1)]],
			type:        ['service', Validators.required],
			serviceId:   [null],
			sparePartId: [null],
			workOrderId: [null]
		});
		this.detailsArray.push(group);
	}

	removeDetail(index: number): void {
		if (this.detailsArray.length > 1) this.detailsArray.removeAt(index);
	}

	detailGroup(index: number): FormGroup {
		return this.detailsArray.at(index) as FormGroup;
	}

	get totalEstimated(): number {
		return 0;
	}

	async onSubmit(): Promise<void> {
		if (this.form.invalid) { this.form.markAllAsTouched(); return; }

		const val = this.form.value;

		const details = val.details.map((d: any) => {
			const detail: any = { concept: d.concept, quantity: d.quantity, workOrderId: d.workOrderId || null };
			if (d.type === 'service')    detail['serviceId']   = d.serviceId;
			if (d.type === 'sparePart')  detail['sparePartId'] = d.sparePartId;
			return detail;
		});

		this.loading = true;
		try {
			await this.api.invoke(invoiceInsert, {
				body: {
					issueDate:  (val.issueDate as Date).toISOString(),
					customerId: val.customerId,
					details
				}
			});
			this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Factura creada con éxito.' });
			this.router.navigate(['/invoice/list']);
		} catch (err: any) {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'La operación falló.' });
		} finally { this.loading = false; }
	}

	f(n: string): AbstractControl | null { return this.form.get(n); }
	df(index: number, n: string): AbstractControl | null { return this.detailGroup(index).get(n); }
}
