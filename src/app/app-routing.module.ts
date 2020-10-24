import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { AppAuthGuard } from './app.authguard';
import { AppComponent } from './app.component';
import { AddComponent } from './modules/add/add.component';
import { SearchComponent } from './modules/search/search.component';


const routes: Routes = [
  {path: '', component: AppComponent},
  {
    path: 'main',
    component: SearchComponent,
    canActivate: [AppAuthGuard]
  },
  {
    path: 'add',
    component: AddComponent,
    canActivate: [AppAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule {}