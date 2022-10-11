import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <div *ngIf="loading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'Stock Tracking App';
  loading = true;

  constructor(router: Router) {
    router.events.subscribe((routerEvent) => {

      if (routerEvent instanceof NavigationStart) {
        this.loading = true;
      }

      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
        this.loading = false;
      }
    });
  }
}
