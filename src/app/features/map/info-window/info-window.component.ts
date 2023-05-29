import { Component, EventEmitter, Input, OnChanges,Output,SimpleChanges} from '@angular/core';
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

  @Output() closeWindow = new EventEmitter();
  @Output() messageResponse = new EventEmitter();
  
  nextPage: number | undefined = undefined
  previousPage: number | undefined = undefined
  comments?: CommentInterface[];
  haveComments = false;
  haveWeekday = false;
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
    // this.setHaveWeekday();
    this.getCommentByUser()
    this.getComments(1)
    this.getRating()
  }

  closedWindow(){
    this.closeWindow.emit(true)
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

  /*setHaveWeekday(){
    this.place.weekday ? this.haveWeekday = false: this.haveWeekday = true;

  }*/


  /***************************comments**************************** */

  getCommentByUser(){
    this.comentInput = "";
    this.commentsService.getCommentByUser(this.placeId).subscribe({
      next: (data: any) => {if(data.comments[0]){
        this.userComment = data.comments[0], this.comentInput= this.userComment!.content, this.userRating = (this.userComment!.stars as number),  this.comentedByUser= true;
      }
      }
    })
  }
     
  getComments(page: number){
    this.commentsService.getCommentsbyPlaceId(this.placeId,page).subscribe({
      next: (data: any) => {this.setPaginatorInfo(data.next, data.previous), 
        this.comments = data.comments;
  
      
      }})
 
  }

  setPaginatorInfo(nextPage: any, previousPage: any){
    nextPage  != undefined ? this.nextPage= nextPage.page: this.nextPage =undefined;
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

    getDateComment(date: string){

      return date.split("T", 2)[0];

    }

    sendComment(){
      this.commentsService.sendComment(this.comentInput, this.placeId, this.userRating).subscribe({
        next: ()=> {
          this.getCommentByUser(), 
          this.showMessage("Opinión enviada")},
        error: () =>{ this.showMessage("No se ha podido enviar la opinión, inténtalo de nuevo más tarde")}
      });


    }

    updateComment(){

      this.commentsService.updateComment(this.userComment!._id, this.comentInput ,this.userRating).subscribe({
        next: () =>{ 
          this.showMessage("Opinión actualizada")
        },
        error: () =>{this.showMessage("No se ha podido actualizar la opinión, inténtalo de nuevo más tarde")}}
        )     

    }

    showMessage(message: string){
      this.messageResponse.emit(message);
    }
             
}
