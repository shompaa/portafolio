import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore) { }

  cargarImagenesFirebase(imagenes: FileItem[]) {
    const storageRef = firebase.storage().ref();
    for (const a of imagenes) {
      a.estaSubiendo = true;
      if (a.progreso >= 100) {
        continue;
      }
      const referenciaImagen = storageRef.child( `${ this.CARPETA_IMAGENES }/${ a.nombreArchivo }` );
      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${a.nombreArchivo}`)
      .put(a.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) => a.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      (error) => console.error('Error al subir', error),
      () => {
        referenciaImagen.getDownloadURL().then(
          ( urlImagen ) => {
              console.log('Imagen cargada correctamente');
              a.url = urlImagen;
              a.estaSubiendo = false;
              this.guardarImagen({
                  nombre: a.nombreArchivo,
                  url: a.url
              });
          },
          ( error ) => console.log('No existe la URL')
      );
      });
    }
  }

  private guardarImagen(imagen: { nombre: string; url: string }) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`).add(imagen);
  }
}
