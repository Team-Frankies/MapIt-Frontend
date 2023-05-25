import { Component, Input, OnInit} from '@angular/core';
import { PlaceInterface, CommentInterface } from '../ifaces';
import { CommentsService } from '../services/comments.service';
import { PhotosService } from '../services/photos.service';
import { Inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.scss']
})
export class InfoWindowComponent implements OnInit{

  @Input() placeId!: string;
  @Input() place!: PlaceInterface;

  
  comments?: CommentInterface[];
  haveComments = false;

  texto: string[] | any;
  cosa: any;

  constructor(private commentsList: CommentsService, private gPhotoService: PhotosService){
    
    
  }

  ngOnInit(){
  
    console.log(this.place)
   
    this.getPhotos()
    
    console.log(this.cosa)
   

  }

  getPhotos(){
    /*this.gPhotoService.getPhotoPlace(this.place.photos[1].photo_reference).subscribe((url: any) => {
      this.cosa = url});*/
      this.cosa="https://lh3.googleusercontent.com/places/ANJU3DvEjvWRT6DR3UClDdq6qMe9BQEkqsXQoyzNdOQpvsmv9UXVMfmjhTlx-vyPHmZdenW25h-BZ1qu9k1gJoi2aUp8HuMHq7qsFx0=s1600-w400"
  }

  getWheelchairAccesibleEntrance(){
    let access= "no"
    if(this.place.wheelchairAccesibleEntrance){
      access =  "si";
    }
    return access;
  }
     
  getComments(){
    this.comments = []
    const  aux: Array<CommentInterface[]> = []; 
    this.commentsList.getComents(this.placeId).subscribe({
      next: (data) => { Object.entries(data).map((elem: any) => { aux.push(elem[1])}), 
      aux[1].forEach((element: any) => {
        this.comments?.push(element  as CommentInterface)
      }),
      console.log(this.comments),
      this.getTexto();
      this.haveComments=true 
      
      }})
 
    
  }

  getTexto(){
   this.texto=[]
   console.log(this.texto);
   if(this.comments){
    this.comments.forEach(element => {
      console.log(element)
         this.texto.push(element.content);
         this.cosa +=element.content
    });
  }
  
  }


}
