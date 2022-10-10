import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockSearchComponent } from './stock-tracker/stock-search/stock-search.component';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';
import { StockListComponent } from './stock-tracker/stock-list/stock-list.component';
import { StockSummaryComponent } from './stock-tracker/stock-list/stock-summary.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    StockTrackerComponent,
    StockSearchComponent,
    StockListComponent,
    StockSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'USD' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
