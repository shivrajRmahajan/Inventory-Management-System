import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface NavItem {
    displayName: string;
    iconName?: string;
    route?: string;
    children?: NavItem[];
    isExpanded?: boolean;
}

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [CommonModule, MatListModule, MatIconModule, RouterLink, RouterLinkActive, MatExpansionModule],
    templateUrl: './sidenav.html',
    styleUrls: ['./sidenav.css'],
    animations: [
        trigger('indicatorRotate', [
            state('collapsed', style({ transform: 'rotate(0deg)' })),
            state('expanded', style({ transform: 'rotate(180deg)' })),
            transition('expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
            ),
        ])
    ]
})
export class SidenavComponent {

    menuItems = signal<NavItem[]>([
        {
            displayName: 'Dashboard',
            iconName: 'dashboard',
            route: '/dashboard'
        },
        {
            displayName: 'Inventory',
            iconName: 'inventory_2',
            children: [
                {
                    displayName: 'Warehouse',
                    iconName: 'warehouse',
                    route: '/warehouses'
                },
                {
                    displayName: 'Products',
                    iconName: 'category',
                    route: '/products'
                }
            ]
        },
        {
            displayName: 'Billing',
            iconName: 'receipt',
            children: [
                {
                    displayName: 'Quotation',
                    iconName: 'request_quote',
                    route: '/quotation'
                }
            ]
        }
    ]);

    toggleSubMenu(item: NavItem) {
        item.isExpanded = !item.isExpanded;
    }
}
