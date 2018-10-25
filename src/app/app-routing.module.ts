import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverlayComponent} from './overlay/overlay.component';
import {MainComponent} from './main/main.component';
import {AuthComponent} from './auth/auth.component';

const routes: Routes = [
  {path: 'overlay/:id', component: OverlayComponent},
  {path: 'auth/:token', component: AuthComponent},
  {path: '', component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
