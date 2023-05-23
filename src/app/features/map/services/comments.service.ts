import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getComents(place: string){
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjQ2YjgzZmYyZmM2NzcxMGQxZDdlZmY4IiwiZXhwIjoxNjg0ODYwNzI0LCJpYXQiOjE2ODQ4NTk4MjR9.waVaIcRSLW_Y2ZsKKwmTPwifceg8YLY5te5AtbvRRhw"
    const headers  = new HttpHeaders().set('Authorization', 'Bearer ' + token)
    place ="ChIJxS2q1AiprI8RT24H4qVdbLg"
    
    return this.http.get(`${this.apiUrl}/comments/`+place,{headers});
  }

}
