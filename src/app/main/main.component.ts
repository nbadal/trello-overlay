import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  public user: User;
  private authSub: Subscription;

  constructor(private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.authSub = this.afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
