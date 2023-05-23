import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent{
 @ViewChild('searchBar', { static: false })searchBar!: ElementRef<HTMLInputElement>;
 @Output() searchResult = new EventEmitter<google.maps.LatLngLiteral>();
 

  ngAfterViewInit() {
    this.initAutocomplete();
  }

  initAutocomplete() {
    if (this.searchBar && this.searchBar.nativeElement instanceof HTMLInputElement) {
    const autocomplete = new google.maps.places.Autocomplete(

      this.searchBar.nativeElement,
      {
        types: ['geocode'],
      }
    );
      autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
 
      console.log("place: ")
      console.log( place)
       const lat = place.geometry?.location?.lat() || 0
       const lng = place.geometry?.location?.lng() || 0

      // Aquí puedes manejar la selección de un lugar en el buscador
      
      this.searchResult.emit({lat, lng})
    });
  }

}}