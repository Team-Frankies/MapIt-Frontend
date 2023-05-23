export interface PlaceInterface {
    formatted_address: string;
    name: string;
    rating: DoubleRange;
    wheelchair_accessible_entrance: boolean;
  }

  export interface CommentInterface{
    id: string;
    placeId: string;
    content: string
    createdAt: string
    stars: DoubleRange;
    updatedAt: string
    writenBy: string;
    v: DoubleRange
   
  }