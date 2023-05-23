import { Component, Input} from '@angular/core';
import { PlaceInterface, CommentInterface } from '../ifaces';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.scss']
})
export class InfoWindowComponent {

  @Input() placeId!: string;

  comments?: CommentInterface[];
  haveComments = false;
  texto: string[] | any;
  cosa=""

  constructor(private commentsList: CommentsService){
    this.getComments();
  }
/**this.markerService.getMap(this.display).subscribe({ 
      next:  (data)=> Object.entries(data).map((elem: any) => {elem.map((e: any) => {this.markers.push(e as google.maps.Marker)})
      })
     })     
     
       
    this.infoPlace.getDataPlace(marker.place_id).subscribe({ 
      next:  (data)=>  {this.setInfoMarker(data, markerElem)}
      })
*/
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
