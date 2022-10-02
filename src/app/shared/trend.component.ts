import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trend',
  template: `
    <h1>
      <span *ngIf="percentage > 0" class="text-success">🢁</span>
      <span *ngIf="percentage < 0" class="text-danger">🢃</span>
    </h1>
`
})
export class TrendComponent {
  @Input() percentage!: number;

  constructor() { }
}
