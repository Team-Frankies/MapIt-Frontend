import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getComents(place: string){
    return this.http.get(`${this.apiUrl}/comments/` + place)
  }

}
