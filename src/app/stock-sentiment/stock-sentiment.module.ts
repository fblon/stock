import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockSentimentComponent } from './stock-sentiment.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: ':symbol', component: StockSentimentComponent
}];

@NgModule({
  declarations: [
    StockSentimentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class StockSentimentModule { }
