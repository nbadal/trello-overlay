import {Component, NgZone, OnInit} from '@angular/core';
import {TrelloService} from '../trello.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {
  public overlayAlign: 'left' | 'center' | 'right';
  public title: string;
  public lists: [{'name': string, 'cards': [{name: string}]}];

  constructor(private ngZone: NgZone, private trelloService: TrelloService) {
    this.overlayAlign = 'left';
    this.title = 'To-Do:';
  }

  ngOnInit() {
    this.trelloService.getTodo().subscribe((lists) => {
      // Change card data in the angular zone.
      this.ngZone.run(() => {
        this.lists = lists;
      });
    }, (err) => {
      console.log({error: err});
    });
  }

}