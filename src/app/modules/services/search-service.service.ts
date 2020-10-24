import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewEntry } from 'src/app/entity/newEntry';
import { HttpParams } from '@angular/common/http';
import { Category } from 'src/app/entity/category';



@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  private mainUrl: string = "";

  constructor(private http: HttpClient) { 
    this.mainUrl = 'http://localhost:8090';
  }

  public findByLogin<T>(login): Observable<T>{
    const params = new HttpParams()
        .set('login', login.toString());
    return this.http.get<T>(this.mainUrl+'/search', {params}); 
  }

  
  public findByLoginAndCategory<T>(map): Observable<T>{
    return this.http.post<T>(this.mainUrl+'/findByCategory', map); 
  } 

  public sumAll<T>(login): Observable<T>{
    const params = new HttpParams()
        .set('login', login.toString());
    return this.http.get<T>(this.mainUrl+'/sumAll', {params}); 
  }

  public sumOfCategory<T>(category: Category): Observable<T>{
    return this.http.post<T>(this.mainUrl+'/sumOfCategory', category); 
  }

  public add(newEntry: NewEntry): Observable<void> {
    return this.http.post<void>(this.mainUrl+'/add', newEntry);
  }
}


