import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';

const routes: Routes = [
  { path: '', component: StockTrackerComponent },
  {
    path: 'sentiment',
    loadChildren: () => import('./insider-sentiment/insider-sentiment.module').then(m => m.InsiderSentimentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
