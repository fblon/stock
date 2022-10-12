import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { SentimentDetails } from './sentiment-details';
import { SentimentDetailsService } from './sentiment-details.service';

@Injectable({
  providedIn: 'root'
})
export class SentimentDetailsResolver implements Resolve<SentimentDetails> {
  constructor(
    private sentimentService: SentimentDetailsService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<SentimentDetails> {
    const symbol = route.params['symbol'].toUpperCase();

    return this.sentimentService.getSentiment(symbol).pipe(
      tap(o => {
        if (o == null) {
          this.router.navigate(['/404']);
        }
      }),
      map(o => <SentimentDetails>o)
    );
  }
}
