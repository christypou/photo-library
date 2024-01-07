import { Component, OnInit } from '@angular/core';
import { imageI } from 'src/app/interfaces/imageI.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent implements OnInit {
  constructor(){}
  favoriteImages:imageI[]=[];

  ngOnInit(): void {
    this.getFavoriteImages();
  }

  getFavoriteImages(){
      const localStorageObjects = localStorage.getItem('favorite');
      if (localStorageObjects !== null) {
        this.favoriteImages = JSON.parse(localStorageObjects);
      }
    }
  }
  


