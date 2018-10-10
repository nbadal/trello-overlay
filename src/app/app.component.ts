import {Component} from '@angular/core';
import {TrelloService} from './trello.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private cards: any;

  constructor(private trelloService: TrelloService) {
    this.trelloService.getTodo()
      .subscribe((todo) => {
        this.cards = todo;
      });
  }

}
