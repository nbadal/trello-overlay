import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {filter, first, flatMap, map} from 'rxjs/operators';
import {from, Observable, of} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) {
  }

  observeUserId(): Observable<string> {
    return this.afAuth.user.pipe(
      filter((user) => user !== null),
      map((user) => user.uid)
    );
  }

  observeUserToken(): Observable<string> {
    return this.afAuth.idToken.pipe(filter((user) => user !== null));
  }

  observeTrelloLinked(): Observable<boolean> {
    return this.observeUserId().pipe(flatMap((userId) => {
      return this.afStore.doc(`users/${userId}`).get().pipe(
        map((value) => value.data()),
        map((data) => data !== undefined && data.trelloAuth !== undefined),
      );
    }));
  }

  signOut(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }

  getTrelloRedirect(): Observable<string> {
    return this.observeUserToken().pipe(
      first(),
      map((idToken) => {
        return `${environment.apiUrl}/trello/redirect?user_token=${idToken}`;
      })
    );
  }

  getTwitchRedirect(): Observable<string> {
    return of(location.href = `${environment.apiUrl}/twitch/redirect`);
  }

  observeLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(map((user) => user !== null));
  }
}
