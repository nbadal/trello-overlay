import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OverlayService} from '../overlay.service';
import {Subscription} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {
  public overlayAlign: 'left' | 'center' | 'right';
  public title: string;
  public lists: [{ 'name': string, 'cards': [{ name: string }] }];

  private paramSub: Subscription;

  constructor(private route: ActivatedRoute, private ngZone: NgZone,
              private overlays: OverlayService) {
    this.overlayAlign = 'left';
    this.title = 'To-Do:';
  }

  ngOnInit() {
    this.paramSub = this.route.params
      .pipe(
        map((params) => params.id),
        flatMap((overlayId) => this.overlays.getOverlay(overlayId))
      )
      .subscribe((params) => {
        this.lists = params as [{ 'name': string, 'cards': [{ name: string }] }];
      });
  }
}
