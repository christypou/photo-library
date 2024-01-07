import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { imageI } from 'src/app/interfaces/imageI.interface';
import { FetchPhotosService } from 'src/app/services/fetch-photos.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit{
  galleryImages:imageI[]=[];
  favoriteImages:imageI[]=[];
  page=1;
  isLoading = false;
  private subscription: Subscription | undefined;

constructor(
  public getImages:FetchPhotosService,
  public toastr:ToastrService){}
  
  ngOnInit(): void {
    this.getPhotos(this.page);
    this.getFavoriteImages();
  }

  getPhotos(page:number){
    this.isLoading = true;
    this.subscription = this.getImages.getPhotos(page).subscribe({
      next: (res: imageI[]) => {
        this.galleryImages = [...this.galleryImages, ...res];
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error('Oops..Something went wrong!');
        console.log(error);
      }
    });
  }

  addToFavorites(photo:imageI){
   if(!this.favoriteImages.some(obj=>obj.id===photo.id)){
    this.favoriteImages=[...this.favoriteImages,photo];
    localStorage.setItem('favorite', JSON.stringify(this.favoriteImages));
    this.toastr.success('Added to Favorites!');
   }else{
    this.toastr.warning('You already favorited this image!');
   }
  }

  getFavoriteImages(){
    const localStorageObjects = localStorage.getItem('favorite');
    if (localStorageObjects !== null) {
      this.favoriteImages = JSON.parse(localStorageObjects);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (!this.isLoading) {
    const windowHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const pos = scrollTop + windowHeight;
    const max = scrollHeight;
    if (pos > max - 200) { 
      this.page++;
      this.getPhotos(this.page);
    }
  }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

