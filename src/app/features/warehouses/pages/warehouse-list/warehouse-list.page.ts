import { Component } from '@angular/core';
import { WarehouseTable } from '../../components/warehouse-table/warehouse-table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-warehouse-list',
  imports: [WarehouseTable, MatToolbarModule, BreadcrumbComponent, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './warehouse-list.page.html',
  styleUrl: './warehouse-list.page.css',
})
export class WarehouseList {

  addWarehouse() {
    console.log('Add warehouse clicked');
  }
}
