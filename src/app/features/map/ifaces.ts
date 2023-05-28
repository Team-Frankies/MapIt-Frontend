export interface PlaceInterface {
    formatted_address: string;
    name: string;
    rating: DoubleRange;
    wheelchair_accessible_entrance: boolean;
  }

  export interface CommentInterface{
    _id: string;
    placeId: string;
    content: string
    createdAt: string
    stars: DoubleRange;
    updatedAt: string
    writtenBy: string;
    v: DoubleRange
   
  }

  export interface PlaceInterface{
    formatAddress: string;
    longName: Array<string[]>;
    name: string;
    formattedPhoneNumber: string;
    weekday: Array<string>;
    wheelchairAccesibleEntrance: boolean
    photos: any[]
  }