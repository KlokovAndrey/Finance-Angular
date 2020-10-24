import { Component, OnInit } from '@angular/core';
import { Entry } from 'src/app/entity/entry';
import { Router } from '@angular/router';


import { SearchServiceService } from '../services/search-service.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  userDetails: KeycloakProfile = null;
  sum: number;
  category: string;
  comment: string = "";
  login: string;

  constructor(private searchService: SearchServiceService, private keycloakService: KeycloakService, private router: Router) { }

  async ngOnInit() {
    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();
    }
  }


  add(){
    this.login = this.userDetails.username;
    this.searchService.add(new Entry(this.login, this.sum, this.category, this.comment))
    .subscribe((data:void) => {
    });
    this.router.navigate(['main']);
  } 
}

