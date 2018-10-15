import {Component, NgZone, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {first, flatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

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
  }

  signOutClicked() {
    this.afAuth.auth.signOut();
  }

  deleteOverlayClicked(id: string) {
    this.afStore.collection('overlays').doc(id).delete();
  }

  addOverlayClicked() {
    this.observeUserId().pipe(first()).subscribe((userId) => {
      this.addOverlay(userId);
    });
  }
}
