import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  private paramSub: Subscription;

  constructor(private route: ActivatedRoute, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.paramSub = this.route.params.subscribe((params) => {
      this.afAuth.auth.signInWithCustomToken(params.token).then(() => {
        window.close();
      });
    });
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }
}
