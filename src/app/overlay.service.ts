import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {first, flatMap, map} from 'rxjs/operators';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Overlay, overlayFrom} from './overlay';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  constructor(private auth: AuthService,
              private afStore: AngularFirestore, private http: HttpClient) {
  }

  observeUserOverlays(): Observable<Overlay[]> {
    return this.auth.observeUserId().pipe(
      map((userId) => this.afStore.collection<Overlay>('overlays', (ref) => {
        return ref.where('user', '==', userId);
      })),
      flatMap((overlays) => overlays.snapshotChanges()),
      map((overlaysChange) => overlaysChange.map((change) => {
        return overlayFrom(change.payload.doc);
      }))
    );
  }

  addUserOverlay(board: string, lists: string[]): Observable<DocumentReference> {
    return this.auth.observeUserId().pipe(
      first(),
      flatMap((userId) => this.afStore.collection<Overlay>('overlays').add(
        {user: userId, title: 'New Overlay', board, lists}
      )),
    );
  }

  getOverlay(id: string) {
    return this.http.get(`${environment.apiUrl}/overlay/${id}`);
  }

  deleteOverlay(id: string): Observable<void> {
    return from(this.afStore.doc(`overlays/${id}`).delete());
  }
}
