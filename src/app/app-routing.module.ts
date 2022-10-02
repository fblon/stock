import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';

const routes: Routes = [
  { path: '', component: StockTrackerComponent },
  {
    path: 'sentiment',
    loadChildren: () => import('./stock-sentiment/stock-sentiment.module').then(m => m.StockSentimentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
