import { Component } from '@angular/core';
import { InformacionService } from '../../services/informacion.service';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styles: []
})
export class BodyComponent {

  constructor( private _is:InformacionService ) {
    
  }

}
