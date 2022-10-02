import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendComponent } from './trend.component';

@NgModule({
  declarations: [
    TrendComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrendComponent
  ]
})
export class SharedModule { }
