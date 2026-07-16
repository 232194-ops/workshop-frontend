import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Api } from '../../../api/api';
import { serviceGetAll, serviceInsert, serviceUpdate } from '../../../api/functions';
import { OptionMenuService } from '../../../observable/option-menu/option-menu.service';

@Component({
	selector: 'app-service-insert',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, InputNumberModule, TextareaModule, ButtonModule],
	template: `
	<div class="page-card">
		<div class="page-header">
			<h2 class="page-title"><i class="pi pi-cog"></i> {{isEdit ? 'Editar Servicio' : 'Nuevo Servicio'}}</h2>
			<a routerLink="/service/list"><p-button label="Volver" icon="pi pi-arrow-left" size="small" severity="secondary" /></a>
		</div>
		<form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-grid">
			<div class="field field-full">
				<label>Nombre *</label>
				<input pInputText formControlName="name" placeholder="Cambio de aceite" class="w-full" />
				@if(f('name')?.invalid && f('name')?.touched){<small class="errorMessage">El nombre es requerido.</small>}
			</div>
			<div class="field field-full">
				<label>Descripción</label>
				<textarea pTextarea formControlName="description" rows="3" class="w-full" placeholder="Detalles del servicio..."></textarea>
			</div>
			<div class="field">
				<label>Precio (S/) *</label>
				<p-inputnumber formControlName="price" mode="decimal" [minFractionDigits]="2" placeholder="0.00" styleClass="w-full" inputStyleClass="w-full" />
				@if(f('price')?.invalid && f('price')?.touched){<small class="errorMessage">El precio es requerido.</small>}
			</div>
			<div class="field-full form-actions">
				<p-button type="submit" [label]="isEdit ? 'Actualizar' : 'Guardar'" icon="pi pi-check" [loading]="loading" />
				<a routerLink="/service/list"><p-button type="button" label="Cancelar" icon="pi pi-times" severity="secondary" /></a>
			</div>
		</form>
	</div>
	`,
	styles: ['.page-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}.field{display:flex;flex-direction:column;gap:.35rem}.field label{font-size:.85rem;font-weight:600;color:#374151}.field-full{grid-column:1/-1}.form-actions{display:flex;gap:.75rem;justify-content:flex-end;padding-top:.5rem}']
})
export class ServiceInsert implements OnInit {
	private fb = inject(FormBuilder); private api = inject(Api);
	private router = inject(Router); private route = inject(ActivatedRoute);
	private messageService = inject(MessageService);
	private optionMenuService = inject(OptionMenuService);
	form!: FormGroup; loading = false; isEdit = false; editId = '';

	ngOnInit(): void {
		this.optionMenuService.sendData('servicelist');
		this.form = this.fb.group({ name: ['', Validators.required], description: [''], price: [null, [Validators.required, Validators.min(0.01)]] });
		const id = this.route.snapshot.queryParams['id'];
		if (id) { this.isEdit = true; this.editId = id; this.loadService(id); }
	}
	async loadService(id: string): Promise<void> {
		try { const r: any = await this.api.invoke(serviceGetAll); const found = (r.data ?? []).find((s: any) => s.idService === id); if (found) this.form.patchValue(found); } catch { }
	}
	async onSubmit(): Promise<void> {
		if (this.form.invalid) { this.form.markAllAsTouched(); return; }
		this.loading = true;
		try {
			if (this.isEdit) { await this.api.invoke(serviceUpdate, { id: this.editId, body: this.form.value }); this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Servicio actualizado con éxito.' }); }
			else { await this.api.invoke(serviceInsert, { body: this.form.value }); this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Servicio creado con éxito.' }); }
			this.router.navigate(['/service/list']);
		} catch (err: any) { this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'La operación falló.' }); }
		finally { this.loading = false; }
	}
	f(n: string) { return this.form.get(n); }
}
