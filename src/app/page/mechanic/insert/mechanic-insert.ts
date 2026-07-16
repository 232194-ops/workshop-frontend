import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Api } from '../../../api/api';
import { mechanicGetAll, mechanicInsert, mechanicUpdate } from '../../../api/functions';
import { OptionMenuService } from '../../../observable/option-menu/option-menu.service';

@Component({
	selector: 'app-mechanic-insert',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, ButtonModule],
	templateUrl: './mechanic-insert.html',
	styleUrl: './mechanic-insert.css'
})
export class MechanicInsert implements OnInit {
	private fb                = inject(FormBuilder);
	private api               = inject(Api);
	private router            = inject(Router);
	private route             = inject(ActivatedRoute);
	private messageService    = inject(MessageService);
	private optionMenuService = inject(OptionMenuService);

	form!: FormGroup;
	loading = false; isEdit = false; editId = '';

	ngOnInit(): void {
		this.optionMenuService.sendData('mechaniclist');
		this.form = this.fb.group({
			firstName: ['', Validators.required],
			specialty: ['', Validators.required],
			phone:     ['']
		});
		const id = this.route.snapshot.queryParams['id'];
		if (id) { this.isEdit = true; this.editId = id; this.loadMechanic(id); }
	}

	async loadMechanic(id: string): Promise<void> {
		try {
			const r: any = await this.api.invoke(mechanicGetAll);
			const found = (r.data ?? []).find((m: any) => m.idMechanic === id);
			if (found) this.form.patchValue(found);
		} catch { }
	}

	async onSubmit(): Promise<void> {
		if (this.form.invalid) { this.form.markAllAsTouched(); return; }
		this.loading = true;
		try {
			if (this.isEdit) {
				await this.api.invoke(mechanicUpdate, { id: this.editId, body: this.form.value });
				this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Mecánico actualizado con éxito.' });
			} else {
				await this.api.invoke(mechanicInsert, { body: this.form.value });
				this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Mecánico creado con éxito.' });
			}
			this.router.navigate(['/mechanic/list']);
		} catch (err: any) {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'La operación falló.' });
		} finally { this.loading = false; }
	}

	f(n: string) { return this.form.get(n); }
}
