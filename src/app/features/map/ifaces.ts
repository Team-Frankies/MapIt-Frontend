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

  export interface PlaceInterface{
    formatted_address: string;
    address_components: Array<string[]>;
    name: string;
    formatted_phone_number: string;
    weekday_text: Array<string>;
    wheelchair_accesible_entrance: boolean
    photos: any[]
  }