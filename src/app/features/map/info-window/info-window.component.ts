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
    this.setHaveWeekday();
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

  setHaveWeekday(){
    this.place.weekday[0] == "opening hours not available" ? this.haveWeekday = false: this.haveWeekday = true;

  }


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
      this.commentsService.sendComment(this.comentInput, this.placeId, this.userRating).subscribe({
        next: ()=> {this.showMessage("opinicón enviada")},
        error: (error) =>{ console.log(error), this.showMessage("no se ha podido enviar la opinión, inténtalo de nuevo mas tarde")}
      });


    }

    updateComment(){

      this.commentsService.updateComment(this.userComment!._id, this.comentInput ,this.userRating).subscribe({
        next: (data) =>{console.log(data), this.showMessage("opición actualizada")},
        error: (error) =>{ console.log(error), this.showMessage("no se ha podido actualizar la opinión, inténtalo de nuevo mas tarde")}}
        )     

    }

    showMessage(message: string){
      this.messageResponse.emit(message);
    }
             
}
