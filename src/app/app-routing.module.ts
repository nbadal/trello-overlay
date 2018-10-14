import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverlayComponent} from './overlay/overlay.component';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  {path: 'overlay', component: OverlayComponent},
  {path: '', component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
