import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  apiUrl = environment.apiUrl;
  private token = localStorage.getItem('token')
  private user ="646f455667fc6a7680fc774b"

  constructor(private http: HttpClient) { }

  getCommentsbyPlaceId(place: string){
    const headers  = new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    return this.http.get(`${this.apiUrl}/comments/${place}`,{headers});
  }
// /comments/:placeId?page=1&limit=4
  getCommentByUser(place: string){
    const headers  = new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    return this.http.get(`${this.apiUrl}/comments/user/${place}/${this.user}`,{headers});
  }

  sendComment(comment: string, place: string){
     
    const headers  = new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    const us = this.user
    return this.http.post(`${this.apiUrl}/comments`,{headers, us, comment, place});
  }


}
