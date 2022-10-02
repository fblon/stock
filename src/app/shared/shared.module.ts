import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendComponent } from './trend.component';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    TrendComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    TrendComponent
  ]
})
export class SharedModule { }
