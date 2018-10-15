import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  twitchLoginClicked() {
    window.open(`${environment.apiUrl}/twitch/redirect`, 'firebaseAuth', 'height=800,width=600');
  }
}
