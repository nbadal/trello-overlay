import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cards = [{'id': '5bb66246f1d1b1055baa56fd', 'name': 'Intro Screens'},
    {'id': '5bb661b48afd1a10b5d69611', 'name': 'AFK Overlay – macOS style progress bar and counter'},
    {'id': '5bb69deed344c604595d1beb', 'name': 'Add basic stream commands (!song, etc)'},
    {'id': '5bb69ddebde15b09043025db', 'name': 'Add a stream bot'}];
}
