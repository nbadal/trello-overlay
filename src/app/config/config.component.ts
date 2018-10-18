import {Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {OverlayService} from '../overlay.service';
import {Overlay} from '../overlay';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public trelloUser: boolean;
  public overlays: Overlay[];

  public newOverlayLists: string;

  constructor(private auth: AuthService, private overlayService: OverlayService,
              private zone: NgZone) {
  }

  ngOnInit() {
    // Get user's overlays:
    this.overlayService.observeUserOverlays().subscribe((overlays) => {
      this.zone.run(() => {
        this.overlays = overlays;
      });
    });

    // Watch Trello link status:
    this.auth.observeTrelloLinked().subscribe((hasAuth) => {
      this.zone.run(() => {
        this.trelloUser = hasAuth;
      });
    });
  }

  linkTrelloClicked() {
    this.auth.getTrelloRedirect().subscribe((url) => location.href = url);
  }

  signOutClicked() {
    this.auth.signOut().subscribe();
  }

  deleteOverlayClicked(id: string) {
    this.overlayService.deleteOverlay(id).subscribe();
  }

  addOverlayClicked() {
    if (!this.newOverlayLists || this.newOverlayLists.length === 0) { return; }

    this.overlayService.addUserOverlay(this.newOverlayLists.split(','))
      .subscribe(() => this.newOverlayLists = '');
  }
}
