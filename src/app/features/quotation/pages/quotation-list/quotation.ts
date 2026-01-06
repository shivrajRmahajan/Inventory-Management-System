import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { PeriodicElement } from '../../models/quotation.model';
import { RouterLink } from "@angular/router";
import { MatMenuModule } from '@angular/material/menu';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatSortModule, MatButtonModule, MatIconModule, MatPaginatorModule,
    MatToolbarModule, MatFormFieldModule, MatInputModule, RouterLink, BreadcrumbComponent, MatMenuModule],
  templateUrl: './quotation.html',
  styleUrls: ['./quotation.css'],
})

export class Quotation implements AfterViewInit {
  // define columns metadata here so headers can be rendered dynamically
  ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, unique: 'Q-125', date: '18/11/2025', customer_name: 'Rohit Sharma', state: 'Maharashtra', amount: 12520 },
    { position: 1, unique: 'Q-105', date: '18/10/2025', customer_name: 'Ajay Kale', state: 'Gujrat', amount: 35124 },
    { position: 1, unique: 'Q-225', date: '10/09/2025', customer_name: 'Vinay Mehata', state: 'Goa', amount: 48512 },
    { position: 1, unique: 'Q-625', date: '08/09/2025', customer_name: 'Ajit Varma', state: 'Hydrabad', amount: 354852 },
    { position: 1, unique: 'Q-115', date: '05/09/2025', customer_name: 'Ram Pande', state: 'Telangana', amount: 115250 },
    { position: 1, unique: 'Q-117', date: '05/09/2025', customer_name: 'Ram Gite', state: 'Maharashtra', amount: 125250 },

  ];
  columns = [
    { key: 'position', label: 'No.' },
    { key: 'unique', label: 'Unique Number' },
    { key: 'date', label: 'Date' },
    { key: 'customer_name', label: 'Customer Name' },
    { key: 'state', label: 'State' },
    { key: 'amount', label: 'Amount' },
  ];
  searchText: any
  displayedColumns: string[] = [...this.columns.map(c => c.key), 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  constructor() { }

  // configure filtering to search across multiple fields
  private setupFilter() {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      const f = filter.trim().toLowerCase();
      // search these fields
      const fields = [data.unique, data.customer_name, data.state, data.date, String(data.amount)];
      return fields.some(val => (val || '').toLowerCase().includes(f));
    };
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.setupFilter();
  }


  announceSortChange(event: any) {
    // console.log(event)
  }

  onAdd(): void {
    console.log('Add Quotation clicked');
  }

  onView(element: PeriodicElement): void {
    console.log('View', element);
    // implement navigation or detail overlay/dialog here
  }

  onEdit(element: PeriodicElement): void {
    console.log('Edit', element);
    // implement edit flow (open dialog or navigate to edit form)
  }

  onDelete(element: PeriodicElement): void {
    console.log('Delete', element);
    // remove from dataSource
    this.dataSource.data = this.dataSource.data.filter(e => e !== element);
  }
  searchClose() {
    this.searchText = '';
    this.applyFilter('');
  }

  applyFilter(value: string) {
    const filterValue = (value || '').trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
