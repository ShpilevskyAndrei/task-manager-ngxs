import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUppercase',
  standalone: true,
})
export class FirstLetterUppercasePipe implements PipeTransform {
  public transform(value: string): string {
    return value[0].toUpperCase() + value.substring(1);
  }
}
