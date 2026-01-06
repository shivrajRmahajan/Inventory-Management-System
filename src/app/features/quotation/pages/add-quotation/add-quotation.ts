import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

export interface QuotationItem {
  itemName: string;
  quantity: number;
  itemPrice: number;
  gst: number;
  discount: number;
  total: number;
}

@Component({
  selector: 'app-add-quotation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './add-quotation.html',
  styleUrls: ['./add-quotation.css'],
})
export class AddQuotation implements OnInit {
  quotationForm!: FormGroup;
  itemForm!: FormGroup;

  quotationNumber: string = '';
  itemTotal: number = 0;

  // Items list
  items: QuotationItem[] = [];
  displayedColumns: string[] = ['itemName', 'quantity', 'itemPrice', 'gst', 'discount', 'total', 'actions'];

  // GST options
  gstOptions: number[] = [0, 5, 12, 18, 28];

  // Indian states
  states: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir'
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForms();
    this.generateQuotationNumber();
    this.setupItemFormListeners();
  }

  initializeForms() {
    // Main quotation form
    this.quotationForm = this.fb.group({
      customerName: ['', [Validators.required]],
      quotationNumber: [{ value: '', disabled: true }],
      state: ['', [Validators.required]],
      date: [new Date(), [Validators.required]]
    });

    // Item form
    this.itemForm = this.fb.group({
      itemName: ['', [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      itemPrice: [0, [Validators.required, Validators.min(0)]],
      gst: [0, [Validators.required]],
      discount: [0, [Validators.min(0), Validators.max(100)]]
    });
  }

  setupItemFormListeners() {
    // Calculate total when quantity, price, GST, or discount changes
    this.itemForm.get('quantity')?.valueChanges.subscribe(() => {
      this.validateQuantity();
      this.calculateItemTotal();
    });

    this.itemForm.get('itemPrice')?.valueChanges.subscribe(() => {
      this.validatePrice();
      this.calculateItemTotal();
    });

    this.itemForm.get('gst')?.valueChanges.subscribe(() => {
      this.calculateItemTotal();
    });

    this.itemForm.get('discount')?.valueChanges.subscribe(() => {
      this.validateDiscount();
      this.calculateItemTotal();
    });
  }

  generateQuotationNumber() {
    const prefix = 'Q-';
    const randomNum = Math.floor(Math.random() * 10000);
    this.quotationNumber = `${prefix}${randomNum}`;
    this.quotationForm.patchValue({ quotationNumber: this.quotationNumber });
  }

  validateQuantity() {
    const quantityControl = this.itemForm.get('quantity');
    if (quantityControl && quantityControl.value < 1) {
      quantityControl.setValue(1, { emitEvent: false });
    }
  }

  validatePrice() {
    const priceControl = this.itemForm.get('itemPrice');
    if (priceControl && priceControl.value < 0) {
      priceControl.setValue(0, { emitEvent: false });
    }
  }

  validateDiscount() {
    const discountControl = this.itemForm.get('discount');
    if (discountControl) {
      const value = discountControl.value;
      if (value < 0) {
        discountControl.setValue(0, { emitEvent: false });
      } else if (value > 100) {
        discountControl.setValue(100, { emitEvent: false });
      }
    }
  }

  calculateItemTotal() {
    const quantity = this.itemForm.get('quantity')?.value || 0;
    const itemPrice = this.itemForm.get('itemPrice')?.value || 0;
    const gst = this.itemForm.get('gst')?.value || 0;
    const discount = this.itemForm.get('discount')?.value || 0;

    const subtotal = quantity * itemPrice;
    const gstAmount = (subtotal * gst) / 100;
    const discountAmount = (subtotal * discount) / 100;
    this.itemTotal = subtotal + gstAmount - discountAmount;
  }

  addItem() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      alert('Please fill in all required item fields (Item Name, Quantity, and Price)');
      return;
    }

    const formValue = this.itemForm.value;
    if (formValue.quantity <= 0 || formValue.itemPrice <= 0) {
      alert('Quantity and Price must be greater than 0');
      return;
    }

    const newItem: QuotationItem = {
      itemName: formValue.itemName,
      quantity: formValue.quantity,
      itemPrice: formValue.itemPrice,
      gst: formValue.gst,
      discount: formValue.discount,
      total: this.itemTotal
    };

    this.items.push(newItem);
    this.resetItemForm();
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  resetItemForm() {
    this.itemForm.reset({
      itemName: '',
      quantity: 1,
      itemPrice: 0,
      gst: 0,
      discount: 0
    });
    this.itemTotal = 0;
  }

  getGrandTotal(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  onSubmit() {
    if (this.quotationForm.invalid) {
      this.quotationForm.markAllAsTouched();
      alert('Please fill in all required fields');
      return;
    }

    if (this.items.length === 0) {
      alert('Please add at least one item');
      return;
    }

    const formValue = this.quotationForm.getRawValue();

    // Here you would typically send the data to a service
    console.log('Quotation Data:', {
      customerName: formValue.customerName,
      quotationNumber: this.quotationNumber,
      state: formValue.state,
      date: formValue.date,
      items: this.items,
      grandTotal: this.getGrandTotal()
    });

    alert('Quotation saved successfully!');
  }

  // Getter methods for easy access to form controls
  get quotationFormControls() {
    return this.quotationForm.controls;
  }

  get itemFormControls() {
    return this.itemForm.controls;
  }
}
