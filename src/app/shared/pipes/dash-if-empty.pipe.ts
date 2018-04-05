import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashIfEmpty'
})
export class DashIfEmptyPipe implements PipeTransform {
  transform(value: string): string {
    if (value === null || value.length === 0) {
      return ' – ';
    }
    return value.toString();
  }
}
