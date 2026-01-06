import { Component } from '@angular/core';
import { WarehouseTable } from '../../components/warehouse-table/warehouse-table';

@Component({
  selector: 'app-warehouse-list',
  imports: [WarehouseTable],
  templateUrl: './warehouse-list.page.html',
  styleUrl: './warehouse-list.page.css',
})
export class WarehouseList {

}
