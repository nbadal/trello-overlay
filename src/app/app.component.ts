import {Component, NgZone, OnInit} from '@angular/core';
import {TrelloService} from './trello.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public cards: { name: string };

  constructor(private ngZone: NgZone, private trelloService: TrelloService) {
  }

  ngOnInit() {
    this.trelloService.getTodo().subscribe((todo) => {
      // Change card data in the angular zone.
      this.ngZone.run(() => {
        this.cards = todo;
      });
    }, (err) => {
      console.log({error: err});
    });
  }
}
