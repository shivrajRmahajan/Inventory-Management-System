import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
// import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-warehouse-table',
  imports: [CommonModule, FormsModule, MatTableModule, MatSortModule, MatButtonModule, MatIconModule, MatPaginatorModule,
    MatToolbarModule, MatMenuModule],
  templateUrl: './warehouse-table.html',
  styleUrl: './warehouse-table.css',
})
export class WarehouseTable implements OnInit {

  ElementDataSource: any[] = [
    { position: 1, unique: 'WH-625', name: 'ABC Maharashtra', type: 'Warehouse', status: 'Active', state: 'Maharashtra', contact: '1234567890' },
    { position: 1, unique: 'BR-115', name: 'XYZ Gujarat', type: 'Branch', status: 'Active', state: 'Gujarat', contact: '1234567890' },
  ];
  columns = [
    { key: 'position', label: 'No.' },
    { key: 'unique', label: 'Unique Number' },
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status' },
    { key: 'state', label: 'State' },
    { key: 'contact', label: 'Contact' },
  ];
  displayedColumns: string[] = [...this.columns.map(c => c.key), 'actions'];
  dataSource = new MatTableDataSource(this.ElementDataSource);
  ngOnInit(): void {

  }

  announceSortChange(event: any) {
    console.log(event);
  }

  onView(element: any) {
    console.log(element);
  }

  onEdit(element: any) {
    console.log(element);
  }

  onDelete(element: any) {
    console.log(element);
  }
}
