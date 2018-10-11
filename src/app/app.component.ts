import {Component, NgZone, OnInit} from '@angular/core';
import {TrelloService} from './trello.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public cards: {
    'in-progress': [{name: string}],
    'todo': [{name: string}],
  };

  constructor(private ngZone: NgZone, private trelloService: TrelloService) {
  }

  ngOnInit() {
    this.trelloService.getTodo().subscribe((cards) => {
      // Change card data in the angular zone.
      this.ngZone.run(() => {
        this.cards = cards;
      });
    }, (err) => {
      console.log({error: err});
    });
  }
}
