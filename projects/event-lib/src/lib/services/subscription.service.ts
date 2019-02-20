import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const SW_PUB_SUB_SERVER_URI = new InjectionToken('SW_PUB_SUB_SERVER_URI');

@Injectable()
export class SubscriptionService {
  constructor(private http: HttpClient, @Inject(SW_PUB_SUB_SERVER_URI) private readonly uri: string) {
  }

  doSubscribe(subscription: any): Observable<void> {
    return this.http.post(`${this.uri}`, subscription, {responseType: 'text'})
      .pipe(map(_ => null));
  }

  doUnsubscribe(endpointUrl: string): Observable<void> {
    const endpointUrlElements = endpointUrl && endpointUrl.split('/');
    const endpointKey = endpointUrlElements && endpointUrlElements.length > 0 ? endpointUrlElements[endpointUrlElements.length - 1] : '';

    return this.http.delete(`${this.uri}/${encodeURIComponent(endpointKey)}`, {responseType: 'text'})
      .pipe(map(_ => null));
  }
}
