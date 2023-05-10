interface Point {
    location : Location[];
  }
  interface Location {
    lat: number;
    lng: number;
  }

  interface IPlace {
    location: google.maps.LatLngLiteral;
    place_id: string;
  }