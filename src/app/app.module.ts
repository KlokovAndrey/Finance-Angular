import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
 
import { AppComponent } from './app.component';

import { AppAuthGuard } from './app.authguard';

import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { initializer } from './app-init';
import { SearchComponent } from './modules/search/search.component';
import { AddComponent } from './modules/add/add.component';


const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AddComponent
  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [AppAuthGuard, KeycloakService, 
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
