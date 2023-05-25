import { Component, Input, OnInit} from '@angular/core';
import { PlaceInterface, CommentInterface } from '../ifaces';
import { CommentsService } from '../services/comments.service';
import { PhotosService } from '../services/photos.service';
import { DataRowOutlet } from '@angular/cdk/table';

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.scss']
})
export class InfoWindowComponent implements OnInit{

  @Input() placeId!: string;
  @Input() place!: PlaceInterface;

  showComments= false;
  comments?: CommentInterface[];
  haveComments = false;

  texto: string[] | any;
  cosa: any;
  comentInput ="";

  constructor(private commentsService: CommentsService, private gPhotoService: PhotosService){
    
    
  }

  ngOnInit(){
     
    this.getPhotos() 
    this.getComments()

  }
/**************************** información de place ********************************/
  getPhotos(){
    /*this.gPhotoService.getPhotoPlace(this.place.photos[1].photo_reference).subscribe((url: any) => {
      this.cosa = url});*/
      this.cosa="https://lh3.googleusercontent.com/places/ANJU3DvEjvWRT6DR3UClDdq6qMe9BQEkqsXQoyzNdOQpvsmv9UXVMfmjhTlx-vyPHmZdenW25h-BZ1qu9k1gJoi2aUp8HuMHq7qsFx0=s1600-w400"
  }

  getWheelchairAccesibleEntrance(){
    let access= "no";
    if(this.place.wheelchairAccesibleEntrance){
      access =  "si";
    }
    return access;
  }

  /***************************comments**************************** */
     
  getComments(){
    console.log("cosa")
    this.comments = []
    const  aux: Array<CommentInterface[]> = []; 
    this.commentsService.getCommentsbyPlaceId(this.placeId).subscribe({
      next: (data) => { Object.entries(data).map((elem: any) => { console.log(elem), aux.push(elem[1])}), 
      aux[1].forEach((element: any) => {
        this.comments?.push(element  as CommentInterface)
      }),
      console.log(this.comments)
      //this.getTexto();
      //this.haveComments=true 
      
      }})
 
  }

    getWritenBy(writenBy: any){

      let author ="";

      if(writenBy.firstname){
        author += writenBy.firstname + " "
      }
      if(writenBy.lastname){
        author += writenBy.lastname
      }
      return author;
    }

    sendComment(){
      this.commentsService.sendComment(this.comentInput, this.placeId).subscribe({
        next: (data) =>{console.log(data)},
        error: (error) =>{ console.log(error) }}
        )
    }

    showInfoPlace(){
      this.showComments = false;
    }

    showCommentsPlace(){
      this.showComments=true;
    }

  

}
