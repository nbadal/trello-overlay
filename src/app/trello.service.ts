import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrelloService {
  constructor(private http: HttpClient) {
  }

  getTodo() {
    return this.http.get(environment.apiUrl + '/trello');
  }
}
