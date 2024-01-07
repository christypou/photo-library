import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { imageI } from 'src/app/interfaces/imageI.interface';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit{
  selectedImage?:imageI;
  constructor(private route: ActivatedRoute,private toastr:ToastrService, private router:Router){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']; 
      this.getImageInfo(id);
    });
  }

  getImageInfo(id:string){
    const data = localStorage.getItem('favorite');
    if(data){
      const favoriteImages= JSON.parse(data);
      this.selectedImage = favoriteImages.find((img:imageI)=>img.id==id)
      if(!this.selectedImage){
        this.toastr.error('No image with that id is saved')
        this.router.navigate(['/not-found']); 
      }
    }
  }

  deletePhoto(id:string){
    const favoriteImages = JSON.parse(localStorage.getItem('favorite') || '{}');
    const newFavoriteImages = favoriteImages.filter((img:imageI)=>img.id!==id)
    localStorage.setItem('favorite', JSON.stringify(newFavoriteImages));
    this.toastr.success('Image removed!')
    this.router.navigate(['/favorites']);
  }

}
