import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from '../../shared/components/sidenav/sidenav';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, SidenavComponent],
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent { }
