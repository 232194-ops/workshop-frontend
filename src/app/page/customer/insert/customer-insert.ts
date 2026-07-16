import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Api } from '../../../api/api';
import { customerGetAll, customerInsert, customerUpdate } from '../../../api/functions';
import { OptionMenuService } from '../../../observable/option-menu/option-menu.service';

@Component({
	selector: 'app-customer-insert',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, ButtonModule],
	templateUrl: './customer-insert.html',
	styleUrl: './customer-insert.css'
})
export class CustomerInsert implements OnInit {
	private fb                = inject(FormBuilder);
	private api               = inject(Api);
	private router            = inject(Router);
	private route             = inject(ActivatedRoute);
	private messageService    = inject(MessageService);
	private optionMenuService = inject(OptionMenuService);

	form!: FormGroup;
	loading  = false;
	isEdit   = false;
	editId   = '';

	ngOnInit(): void {
		this.optionMenuService.sendData('customerlist');
		this.form = this.fb.group({
			firstName:      ['', Validators.required],
			surName:        ['', Validators.required],
			documentNumber: ['', Validators.required],
			phone:          [''],
			email:          ['', Validators.email],
			address:        ['']
		});

		const id = this.route.snapshot.queryParams['id'];
		if (id) {
			this.isEdit = true;
			this.editId = id;
			this.loadCustomer(id);
		}
	}

	async loadCustomer(id: string): Promise<void> {
		try {
			const response: any = await this.api.invoke(customerGetAll);
			const found = (response.data ?? []).find((c: any) => c.idCustomer === id);
			if (found) this.form.patchValue(found);
		} catch {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los datos del cliente.' });
		}
	}

	async onSubmit(): Promise<void> {
		if (this.form.invalid) { this.form.markAllAsTouched(); return; }
		this.loading = true;
		try {
			if (this.isEdit) {
				await this.api.invoke(customerUpdate, { id: this.editId, body: this.form.value });
				this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Cliente actualizado con éxito.' });
			} else {
				await this.api.invoke(customerInsert, { body: this.form.value });
				this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Cliente creado con éxito.' });
			}
			this.router.navigate(['/customer/list']);
		} catch (err: any) {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'La operación falló.' });
		} finally {
			this.loading = false;
		}
	}

	f(name: string) { return this.form.get(name); }
}
