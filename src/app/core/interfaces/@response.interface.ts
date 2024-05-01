import { ResponseStatusesEnum } from '../enums/response-statuses.enum';

export interface IResponse<T> {
  status: ResponseStatusesEnum;
  data?: T;
  errorMessage?: string;
}
