import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {OverlayComponent} from './overlay/overlay.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {MainComponent} from './main/main.component';
import {ConfigComponent} from './config/config.component';
import {LoginComponent} from './login/login.component';
import {AngularFireAuthModule} from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    OverlayComponent,
    MainComponent,
    ConfigComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
