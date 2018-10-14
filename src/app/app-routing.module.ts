import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverlayComponent} from './overlay/overlay.component';

const routes: Routes = [
  {path: 'overlay', component: OverlayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
