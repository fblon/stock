import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendComponent } from './trend.component';
import { HttpClientModule } from '@angular/common/http';
import { StockTitlePipe } from './stock-title.pipe';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  declarations: [
    TrendComponent,
    StockTitlePipe,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    TrendComponent,
    StockTitlePipe
  ]
})
export class SharedModule { }
