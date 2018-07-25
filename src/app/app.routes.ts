import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { ImagenesComponent } from './components/imagenes/imagenes.component';

const RUTAS: Routes = [
    {path: 'index', component: BodyComponent},
    {path: 'tristy', component: ImagenesComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'index'}
];

export const APP_ROUTES = RouterModule.forRoot(RUTAS, {useHash: true});
