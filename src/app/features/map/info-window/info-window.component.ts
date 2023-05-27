import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { PlaceInterface, CommentInterface } from '../ifaces';
import { CommentsService } from '../services/comments.service';
import { PhotosService } from '../services/photos.service';
import { DataRowOutlet } from '@angular/cdk/table';

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.scss']
})
export class InfoWindowComponent implements OnChanges{

  @Input() placeId!: string;
  @Input() place!: PlaceInterface;
  @Input() ratingPlace?: number = 3;
  
  nextPage: number | undefined = undefined
  previousPage: number | undefined = undefined
  comments?: CommentInterface[];
  haveComments = false;
  rating: DoubleRange | undefined;
  userComment: CommentInterface | undefined
  userRating: number | undefined
  comentedByUser= false;
  
  texto: string[] | any;
  cosa: any;
  comentInput ="";

  constructor(private commentsService: CommentsService, private gPhotoService: PhotosService){
    
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes['placeId']){
      this.updateInfoWindow();
    }
  }

  updateInfoWindow(){
   this.comentedByUser= false;
    this.getPhotos() 
    this.getCommentByUser()
    this.getComments(1)
    this.getRating()
  }

 
/**************************** información de place ********************************/
  getPhotos(){
    /*this.gPhotoService.getPhotoPlace(this.place.photos[1].photo_reference).subscribe((url: any) => {
      this.cosa = url});*/
      this.cosa="https://lh3.googleusercontent.com/places/ANJU3DvEjvWRT6DR3UClDdq6qMe9BQEkqsXQoyzNdOQpvsmv9UXVMfmjhTlx-vyPHmZdenW25h-BZ1qu9k1gJoi2aUp8HuMHq7qsFx0=s1600-w400"
  }

  getWheelchairAccesibleEntrance(){
    return this.place.wheelchairAccesibleEntrance ? "si" : "no";
  }

  getRating(){
    let aux;
    
    this.commentsService.getRating(this.placeId).subscribe({
     next: (data) => {console.log(data)}
   })

    console.log("rating:")
    console.log(aux)
  }


  /***************************comments**************************** */

  getCommentByUser(){
    this.comentInput = "";
    this.commentsService.getCommentByUser(this.placeId).subscribe({
      next: (data: any) => {if(data.comments[0]){
        this.userComment = data.comments[0], console.log(this.userComment), this.comentInput= this.userComment!.content, this.userRating = (this.userComment!.stars as number),  this.comentedByUser= true;
      }
      }
    })
  }
     
  getComments(page: number){
    this.commentsService.getCommentsbyPlaceId(this.placeId,1).subscribe({
      next: (data: any) => { console.log(data)
        this.setPaginatorInfo(data.next, data.previous), 
        this.comments = data.comments;
      
      console.log(this.comments)

      
      }})
 
  }

  setPaginatorInfo(nextPage: any, previousPage: any){
    typeof nextPage  === "number" ? this.nextPage= nextPage: this.nextPage =undefined;
    typeof previousPage  == "number"? this.previousPage=previousPage: this.previousPage= undefined;
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
      this.commentsService.sendComment(this.comentInput, this.placeId, this.ratingPlace).subscribe({
        next: (data) =>{console.log(data)},
        error: (error) =>{ console.log(error) }}
        )
    }

    updateComment(){
      console.log(this.userComment!._id)
      console.log(this.userRating)
      this.commentsService.updateComment(this.userComment!._id, this.comentInput ,this.userRating).subscribe({
        next: (data) =>{console.log(data)},
        error: (error) =>{ console.log(error) }}
        )     

    }
             
}
