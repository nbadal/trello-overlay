import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  private paramSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private ngZone: NgZone,
              private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.paramSub = this.route.params.subscribe((params) => {
      this.afAuth.auth.signInWithCustomToken(params.token).then(() => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
      });
    });
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }
}
