import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentimentDetailsComponent } from './sentiment-details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MonthSentimentComponent } from './month-sentiment.component';
import { SentimentDetailsResolver } from './sentiment-details.resolver';

const routes: Routes = [{
  path: ':symbol', 
  component: SentimentDetailsComponent,
  resolve: { sentimentDetails: SentimentDetailsResolver }
}];

@NgModule({
  declarations: [
    SentimentDetailsComponent,
    MonthSentimentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class InsiderSentimentModule { }
