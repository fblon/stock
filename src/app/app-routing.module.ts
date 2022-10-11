import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';

const routes: Routes = [
  {
    path: 'sentiment',
    loadChildren: () => import('./insider-sentiment/insider-sentiment.module').then(m => m.InsiderSentimentModule)
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '', component: StockTrackerComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
