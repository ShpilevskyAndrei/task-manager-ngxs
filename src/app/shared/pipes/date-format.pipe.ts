import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  public transform(dateString: string): string {
    const date: Date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
    const formattedDate: string = date.toLocaleDateString('en-EN', options);

    return formattedDate.replace(' y.', '');
  }
}
