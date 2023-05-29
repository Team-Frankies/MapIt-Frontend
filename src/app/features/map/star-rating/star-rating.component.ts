import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  template: `
    <div class="container-rating">
      <img *ngFor="let star of stars; let i = index"
           [src]="getStarImage(i)"
           (click)="setRating(i)"
           (mouseover)="highlightStars(i)"
           (mouseout)="resetStars()">
    </div>
  `,
  styles: [
    `
      .container-rating {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: auto;
    }
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin: 0.25rem;
      cursor: pointer;
    }
    `
  ]
})
export class StarRatingComponent{
  @Input() editable = true;
  @Input() rating?: number;
  @Output() ratingChange = new EventEmitter<number>();
  hoveredRating?: number;
  stars = [1, 2, 3, 4, 5];

  getStarImage(index: number): string {
    if (this.hoveredRating !== undefined && index < this.hoveredRating) {
      return "../../../assets/images/star-filled.svg";
    } else if (this.rating !== undefined && index < this.rating) {
      return "../../../assets/images/star-filled.svg";
    } else {
      return "../../../assets/images/star-empty.svg";
    }
  }

  setRating(index: number) {
    if (this.editable) { 
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    } 
  }

  highlightStars(index: number) {
    if (this.editable) {
      this.hoveredRating = index + 1;
    } 
  }

  resetStars() {
    if (this.editable) {
      this.hoveredRating = undefined;
    } 
  }
}
