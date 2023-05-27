import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  apiUrl = environment.apiUrl;
  private token = this.authService.getTokenId('token');
  private user ="646f455667fc6a7680fc774b"

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCommentsbyPlaceId(place: string, page: number){
    const headers  = new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    return this.http.get(`${this.apiUrl}/comments/${place}`,{headers});
  }

// /comments/${place}?page=${page}&limit=4

  getRating(place:string){
    const headers  = new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    return this.http.get(`${this.apiUrl}/comments/rate/${place}`,{headers});
  }

  getCommentByUser(place: string){
    const headers  = new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    return this.http.get(`${this.apiUrl}/comments/user/${place}/${this.user}`,{headers});
  }

  sendComment(comment: string, place: string){
    const headers  = new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    const writenBy = this.authService.getTokenId('id');
    const body = {
      writenBy,
      content: comment,
      placeId: place,
      stars: 5
    }
    return this.http.post(`${this.apiUrl}/comments`, body, { headers } );
  }


}
