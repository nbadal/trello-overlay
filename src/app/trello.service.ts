import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrelloService {
  constructor() {
  }

  getTodo() {
    return Observable.create(observer => {
      const eventSource = new EventSource(environment.apiUrl + '/trello');
      eventSource.onmessage = x => {
        if (observer.closed) {
          return;
        }
        try {
          observer.next(JSON.parse(x.data));
        } catch (e) {
          observer.error(e);
        }
      };
      eventSource.onerror = (x) => {
        observer.error(x);
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
