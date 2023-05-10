import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent{
 @ViewChild('searchBar', { static: false })searchBar!: ElementRef<HTMLInputElement>;
 //@Output() searchResult = new EventEmitter<string>();

  text = '';

  ngAfterViewInit() {
    console.log(1)
    this.initAutocomplete();
  }

  initAutocomplete() {
    console.log(2)
    if (this.searchBar && this.searchBar.nativeElement instanceof HTMLInputElement) {
    const autocomplete = new google.maps.places.Autocomplete(

      this.searchBar.nativeElement,
      {
        types: ['geocode'],
      }
    );
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      // Aquí puedes manejar la selección de un lugar en el buscador
    });
  
  }
  
  }

  /*search() {
    // Aquí realizas la búsqueda y obtienes el resultado
    const result = 'Resultado de búsqueda';
    this.searchResult.emit(this.text);
  }
*/

}

