import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsiderSentimentComponent } from './insider-sentiment.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MonthSentimentComponent } from './month-sentiment.component';

const routes: Routes = [{
  path: ':symbol', component: InsiderSentimentComponent
}];

@NgModule({
  declarations: [
    InsiderSentimentComponent,
    MonthSentimentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class InsiderSentimentModule { }
