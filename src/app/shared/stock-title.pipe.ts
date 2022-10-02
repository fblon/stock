import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockTitle'
})
export class StockTitlePipe implements PipeTransform {

  transform(value: { symbol: string, description: string  }): string {
    return `${value.description} (${value.symbol})`
  }

}
