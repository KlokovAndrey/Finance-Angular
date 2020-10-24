import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { stringify } from 'querystring';
import { Entry } from 'src/app/entity/entry';
import { Chart } from "chart.js";


import { SearchServiceService } from '../services/search-service.service';
import { KeycloakService } from 'keycloak-angular';
import { Category } from 'src/app/entity/category';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  

  userDetails: KeycloakProfile = null;
  total: number = 0;
  entries: Entry[] = null;
  login: string = "";
  category: string;
  public chart: any = null;
  categories: number[];
  

  constructor(private searchService: SearchServiceService, private keycloakService: KeycloakService) {

    }

    async ngOnInit() {
    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();
    }
    this.categories = new Array(6);
    this.sumOfCategory();
    this.find();
    this.sumAll();

    
    
    
  }

    find(){
      this.login = this.userDetails.username;
      this.searchService.findByLogin(this.login).subscribe((data:Entry[]) => {
        this.entries = data;
        this.entries.reverse();
      });
      
    }

    findByCategory(){
      this.login = this.userDetails.username;
      var map:string[] = [this.login, this.category];
      this.searchService.findByLoginAndCategory(map).subscribe((data:Entry[]) => {
        this.entries = data;
      });
    }

    sumAll() {
      this.login = this.userDetails.username;
      this.searchService.sumAll(this.login).subscribe((data:number) => {
        this.total = data;
      });
    }
    
    sumOfCategory(){
      this.login = this.userDetails.username;
      this.searchService.sumOfCategory(new Category(this.login, "еда")).subscribe((data:number) =>  {
        this.categories[0] = data;
      });
      this.searchService.sumOfCategory(new Category(this.login, "учеба")).subscribe((data:number) =>  {
        this.categories[1] = data;
      });
      this.searchService.sumOfCategory(new Category(this.login, "развлечения")).subscribe((data:number) =>  {
        this.categories[2] = data;
      });
      this.searchService.sumOfCategory(new Category(this.login, "медицина")).subscribe((data:number) =>  {
        this.categories[3] = data;
      });
      this.searchService.sumOfCategory(new Category(this.login, "бытовые товары")).subscribe((data:number) =>  {
        this.categories[4] = data;
      });
      this.searchService.sumOfCategory(new Category(this.login, "подарки")).subscribe((data:number) =>  {
        this.categories[5] = data;
        this.pie();
      });
    }

    pie() {
      this.chart = new Chart("canvas", {
        type: 'doughnut',
        options: {
          legend: {
              position: 'bottom'
          }
        },
        data: {
            labels: ["Еда", "Учеба", "Отдых", "Медицина", "Бытовые товары", "Подарки"],
            datasets: [{
              label: '# of Votes',  
                data: [
                  this.categories[0], this.categories[1], this.categories[2],
                  this.categories[3], this.categories[4], this.categories[5] 
              ],
                backgroundColor: [
                  'rgba(204,0,255,1)',
                  'rgba(153, 0, 153, 1)',
                  'rgba(0, 255, 4, 1)',
                  'rgba(51, 152, 102, 1)',
                  'rgba(0, 204, 102, 1)',
                  'rgba(255, 102 , 0, 1)'
                ],
                borderColor: [
                    'rgba(255, 255, 255, 1)'
                ],
                borderWidth: 3
            }]
        }
    });
    }
    
}
