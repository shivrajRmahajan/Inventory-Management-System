import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-warehouse-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzIconModule,
    NzSelectModule,
    BreadcrumbComponent
  ],
  templateUrl: './warehouse-form.page.html',
  styleUrl: './warehouse-form.page.css',
})
export class WarehouseFormPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Predefined lists for dropdowns
  states: string[] = [
    'Maharashtra',
    'Delhi',
    'Karnataka',
    'Tamil Nadu',
    'Gujarat',
    'Telangana',
    'Other'
  ];

  countries: string[] = [
    'India',
    'USA',
    'UK',
    'Australia',
    'Canada',
    'Other'
  ];

  warehouseForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    is_warehouse: [true], // true for Warehouse, false for Branch
    is_headquarters: [false],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    address: ['', [Validators.required]],
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    logo: [null]
  });

  selectedLogoName: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedLogoName = file.name;
      this.warehouseForm.patchValue({ logo: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.warehouseForm.valid) {
      console.log('Form Submitted', this.warehouseForm.value);
      this.router.navigate(['/warehouses']);
    } else {
      this.warehouseForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/warehouses']);
  }
}
