import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-sentiment',
  template: `
    <p>
      stock-sentiment {{ symbol }}
    </p>
    <a [routerLink]="['/']"
          class="btn btn-outline-secondary"
                id="backBtn">
                < Back to list of stocks
    </a>
  `,
  styles: [
  ]
})
export class StockSentimentComponent implements OnInit {

  symbol!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.symbol = params['symbol'];
    })
  }

}
