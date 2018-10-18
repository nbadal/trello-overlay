import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {first, flatMap, map} from 'rxjs/operators';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Overlay, overlayFrom} from './overlay';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  constructor(private auth: AuthService, private afStore: AngularFirestore) {
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

  addUserOverlay(lists: string[]): Observable<DocumentReference> {
    return this.auth.observeUserId().pipe(
      first(),
      flatMap((userId) => this.afStore.collection<Overlay>('overlays').add(
        {user: userId, title: 'New Overlay', lists}
      )),
    );
  }

  deleteOverlay(id: string): Observable<void> {
    return from(this.afStore.doc(`overlays/${id}`).delete());
  }
}
