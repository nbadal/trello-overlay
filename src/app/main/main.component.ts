import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  public loggedIn: boolean;
  private authSub: Subscription;

  constructor(private auth: AuthService, private zone: NgZone) {
  }

  ngOnInit() {
    this.authSub = this.auth.observeLoggedIn().subscribe((loggedIn) => {
      this.zone.run(() => {
        this.loggedIn = loggedIn;
      });
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
