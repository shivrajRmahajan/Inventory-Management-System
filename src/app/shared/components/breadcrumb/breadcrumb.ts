import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.html',
  styleUrls: ['./breadcrumb.css']
})
export class BreadcrumbComponent {
  segments: Array<{ label: string; url: string }> = [];

  constructor(private router: Router) {
    // rebuild on navigation
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => this.build());
    this.build();
  }

  private build() {
    const raw = this.router.url.split('?')[0].split('#')[0] || '/';
    const parts = raw.replace(/^\/+/,'').replace(/\/+$/,'').split('/').filter(Boolean);
    const segments: Array<{ label: string; url: string }> = [];
    let acc = '';
    for (const p of parts) {
      acc += `/${p}`;
      segments.push({ label: this.labelize(p), url: acc });
    }
    // ensure Home always present
    this.segments = [{ label: 'Home', url: '/' }, ...segments];
  }

  private labelize(segment: string) {
    // try to prettify segment: replace dashes/underscores and capitalize words
    return segment
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (m) => m.toUpperCase());
  }
}
