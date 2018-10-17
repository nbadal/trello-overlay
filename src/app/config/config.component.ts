import {Component, NgZone, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {first, flatMap, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public trelloUser: boolean;
  public overlays: { id: string, data: any }[];

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore,
              private zone: NgZone) {
  }

  private observeUserId() {
    return this.afAuth.user.pipe(map((user) => user.uid));
  }

  private observeOverlays(userId: string) {
    return this.afStore.collection('overlays', (ref) => {
      return ref.where('user', '==', userId);
    }).snapshotChanges().pipe(
      map((changes) => changes.map((change) => {
        return {id: change.payload.doc.id, data: change.payload.doc.data() as any};
      }))
    );
  }

  private observeTrelloAuth(userId: string) {
    return this.afStore.doc(`users/${userId}`).get().pipe(
      map((value) => value.data()),
      map((data) => data !== undefined && data.trelloAuth !== undefined),
    );
  }

  private addOverlay(userId: string) {
    return this.afStore.collection('overlays').add({
      user: userId,
      title: 'New Overlay',
    });
  }

  ngOnInit() {
    // Get user's overlays:
    this.observeUserId().pipe(
      flatMap((userId) => this.observeOverlays(userId)),
    ).subscribe((overlays) => {
      this.zone.run(() => {
        this.overlays = overlays;
      });
    });

    this.observeUserId().pipe(
      flatMap((userId) => this.observeTrelloAuth(userId)),
    ).subscribe((hasAuth) => {
      this.zone.run(() => {
        this.trelloUser = hasAuth;
      });
    });
  }

  linkTrelloClicked() {
    this.afAuth.idToken.pipe(first()).subscribe((idToken) => {
      location.href = `${environment.apiUrl}/trello/redirect?user_token=${idToken}`;
    });
  }

  signOutClicked() {
    this.afAuth.auth.signOut();
  }

  deleteOverlayClicked(id: string) {
    this.afStore.doc(`overlays/${id}`).delete().then();
  }

  addOverlayClicked() {
    this.observeUserId().pipe(first()).subscribe((userId) => {
      this.addOverlay(userId);
    });
  }
}
