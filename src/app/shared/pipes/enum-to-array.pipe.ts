import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray',
  standalone: true,
})
export class EnumToArrayPipe<T> implements PipeTransform {
  public transform<E extends T>(
    data: E | { [key: string]: E },
    excludeValue?: E | E[],
  ): E[] {
    if (data instanceof Object && !(data instanceof Array)) {
      const values: E[] = Object.values(data);

      return values.filter((val: E): boolean => {
        if (Array.isArray(excludeValue)) {
          return !excludeValue.includes(val);
        }

        return val !== excludeValue;
      });
    } else {
      return [data as E];
    }
  }
}
