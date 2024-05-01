import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpOptions } from '../interfaces/http-options.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  public constructor(private readonly _http: HttpClient) {}

  public get<T>(
    api: string,
    url: string,
    params?: HttpParams,
    options: HttpOptions = {},
  ): Observable<T> {
    if (params) {
      options.params = params;
    }

    return this._http.get<T>(`${api}/${url}`, options);
  }

  public post<T>(
    api: string,
    url: string,
    body?: T | null,
    options: HttpOptions = {},
  ): Observable<T> {
    return this._http.post<T>(`${api}/${url}`, body, options);
  }

  public put<T>(
    api: string,
    url: string,
    body?: T | null,
    options: HttpOptions = {},
  ): Observable<T> {
    return this._http.put<T>(`${api}/${url}`, body, options);
  }

  public patch<T>(
    api: string,
    url: string,
    body: T | null,
    id?: string,
    options: HttpOptions = {},
  ): Observable<T> {
    const fullUrl = id ? `${api}/${url}/${id}` : `${api}/${url}`;

    return this._http.patch<T>(fullUrl, body, options);
  }

  public delete<T>(
    api: string,
    url: string,
    id?: string,
    options: HttpOptions = {},
  ): Observable<T> {
    const fullUrl = id ? `${api}/${url}/${id}` : `${api}/${url}`;

    return this._http.delete<T>(fullUrl, options);
  }
}
