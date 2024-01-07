import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PhotoComponent } from './components/photo/photo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path:'', component:GalleryComponent},
  {path:'favorites', component:FavoritesComponent},
  {path:'photos/:id',component:PhotoComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
