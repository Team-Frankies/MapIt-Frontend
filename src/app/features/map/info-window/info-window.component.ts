import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { PlaceInterface, CommentInterface } from '../ifaces';
import { CommentsService } from '../services/comments.service';


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
  rating: number | undefined;
  userComment: CommentInterface | undefined
  userRating: number | undefined
  comentedByUser= false;
  
  texto: string[] | any;
  cosa: any;
  comentInput ="";

  constructor(private commentsService: CommentsService){
    
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes['placeId']){
      this.updateInfoWindow();
    }
  }

  updateInfoWindow(){
   this.comentedByUser= false;
    this.getCommentByUser()
    this.getComments(1)
    this.getRating()
  }

 
/**************************** información de place ********************************/

  getWheelchairAccesibleEntrance(){
    return this.place.wheelchairAccesibleEntrance ? "si" : "no";
  }

  getRating(){
  
    
    this.commentsService.getRating(this.placeId).subscribe({
     next: (data: any) => { this.rating = Math.round( data.commentsRate )}
   })

  
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
    this.commentsService.getCommentsbyPlaceId(this.placeId,page).subscribe({
      next: (data: any) => { console.log("Pagina:"),console.log(page), console.log(data)
        this.setPaginatorInfo(data.next, data.previous), 
        this.comments = data.comments;
      
      console.log(this.comments)

      
      }})
 
  }

  setPaginatorInfo(nextPage: any, previousPage: any){
    typeof nextPage  != undefined ? this.nextPage= nextPage.page: this.nextPage =undefined;
    previousPage != undefined ? this.previousPage=previousPage.page: this.previousPage= undefined;
  }

    getWrittenBy(writtenBy: any){

      let author ="";

      if(writtenBy.firstname){
        author += writtenBy.firstname + " "
      }
      if(writtenBy.lastname){
        author += writtenBy.lastname
      }
      return author;
    }

    sendComment(){
      this.commentsService.sendComment(this.comentInput, this.placeId, this.userRating)
    }

    updateComment(){
      console.log(this.userComment!._id)
      console.log("rating nuevo: ", this.userRating)
      this.commentsService.updateComment(this.userComment!._id, this.comentInput ,this.userRating).subscribe({
        next: (data) =>{console.log(data)},
        error: (error) =>{ console.log(error) }}
        )     

    }
             
}
