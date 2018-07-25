import { Component, OnInit } from '@angular/core';
import { ImagenesService } from '../../services/imagenes.service';
import { FileItem } from '../../models/file-item';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styles: []
})
export class ImagenesComponent implements OnInit {

  archivos: FileItem[] = [];
  sobreDrop = false;

  constructor(public is: ImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes() {
    this.is.cargarImagenesFirebase(this.archivos);
  }

  limpiar() {
    this.archivos = [];
  }
}
