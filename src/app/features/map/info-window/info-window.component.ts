import { Component, Input, } from '@angular/core';
import { PlaceInterface } from '../ifaces';

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.scss']
})
export class InfoWindowComponent {

  @Input() place!: PlaceInterface;

  myRating: number = 4;
  myRatingEditable: number = 1;

}
