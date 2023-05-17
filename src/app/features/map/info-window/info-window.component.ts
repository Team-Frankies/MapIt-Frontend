import { Component} from '@angular/core';

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.scss']
})
export class InfoWindowComponent {
  //@ViewChild('', { static: false })info!: ElementRef;

  mostrarElemento = true;

  nomostrar(){
    console.log('mostrar')
    this.mostrarElemento = !this.mostrarElemento
  }
}
