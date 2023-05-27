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
  private user = this.authService.getTokenId('id');

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCommentsbyPlaceId(place: string, page: number){
    const headers  = new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    return this.http.get(`${this.apiUrl}/comments/${place}/${this.user}?page=${page}&limit=4`,{headers});
  }

// /comments/${place}?page=${page}&limit=4

  getRating(place:string){
    const headers  = new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    return this.http.get(`${this.apiUrl}/comments/rate/${place}`,{headers});
  }

  getCommentByUser(place: string){
    const headers  = new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    return this.http.get(`${this.apiUrl}/comments/user/${this.user}/${place}`,{headers});
  }

  sendComment(comment: string, place: string, stars: number | undefined = undefined){
    const headers  = new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    const body = {
      writtenBy: this.user,
      content: comment,
      placeId: place,
      stars,
    }
    return this.http.post(`${this.apiUrl}/comments`, body, { headers } );
  }

  updateComment( comentId: string, comment: string, stars: number | undefined){
    const headers  = new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
    const body = {
      content: comment,
      stars,
    }
    return this.http.put(`${this.apiUrl}/comments/${comentId}`, body, { headers } );
  }


}
