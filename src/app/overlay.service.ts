import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {first, flatMap, map} from 'rxjs/operators';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  constructor(private auth: AuthService, private afStore: AngularFirestore) {
  }

  observeOverlays() {
    return this.auth.observeUserId().pipe(
      map((userId) => this.afStore.collection('overlays', (ref) => {
        return ref.where('user', '==', userId);
      })),
      flatMap((overlays) => overlays.snapshotChanges()),
      map((overlaysChange) => overlaysChange.map((change) => {
        return {id: change.payload.doc.id, data: change.payload.doc.data() as any};
      }))
    );
  }

  addOverlay(): Observable<DocumentReference> {
    return this.auth.observeUserId().pipe(
      first(),
      flatMap((userId) => this.afStore.collection('overlays').add({
        user: userId,
        title: 'New Overlay',
      })),
    );
  }

  deleteOverlay(id: string): Observable<void> {
    return from(this.afStore.doc(`overlays/${id}`).delete());
  }
}
