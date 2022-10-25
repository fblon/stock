import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';
import { StockTrackerResolver } from './stock-tracker/stock-tracker.resolver';

const routes: Routes = [
  {
    path: '',
    component: StockTrackerComponent,
    resolve: { stocks: StockTrackerResolver }
  },
  {
    path: 'sentiment',
    redirectTo: ''
  },
  {
    path: 'sentiment',
    loadChildren: () => import('./insider-sentiment/insider-sentiment.module').then(m => m.InsiderSentimentModule)
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
