import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit{
  //creo elemento observable con valor por
  searchTerm$ = new BehaviorSubject<string>('');
  apiUrl =environment.apiUrl;
  
  //utilizo lista de provincias como ejemplo
  private listTest = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']

  constructor (private http: HttpClient){}


  //creo elemento observable para  volcar listado de provincias
  listFiltered$ = new Observable<string[]> ;

  //llamamos a la variable filterList despues del constructor al renderizarse nuestro componente
  ngOnInit(): void {
    this.filterList();
  }
/*al iniciar el componente igualamos el valor de la lista de provincias a listFiltered$, 
ya que el estado inicial de nuestro buscador es que muestre toda la data y como veremos 
a continuación esta variable es la que realmente se recorre en el*ngFor del HTML.*/
  filterList(): void {
    this.listFiltered$ = this.searchTerm$
    //en el .pipe hacemos que el buscador haga recomendaciones cuando pasen 400ms tras dejar de escribir
    .pipe(
      debounceTime(400),
      distinctUntilChanged(),
      map(term => {
        return this.listTest
        .filter(item =>
          item.toLowerCase().indexOf(term.toLowerCase()) >= 0);
      })
    
    )
    
  }

  muestraSitio(event: any):void{
      const valor =  event.target?.value;
      if(valor != null){
        console.log(valor)
        
      }
  }

  

  recommender (event: any):void{
    const valor = event.target?.value;
    if (valor != null) {
      this.searchTerm$.next(valor)
      console.log(valor)
    }}

    
    
}
