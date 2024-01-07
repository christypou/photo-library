import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import { imageI } from 'src/app/interfaces/imageI.interface';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatGridListModule } from '@angular/material/grid-list';

fdescribe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryComponent],
      imports: [HttpClientModule,ToastrModule.forRoot(),MatGridListModule],
      providers: [ToastrService]
    });
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should call getPhotos and getFavoriteImages on initialization', () => {
    // Arrange
    spyOn(component, 'getPhotos');
    spyOn(component, 'getFavoriteImages');
  
    // Act
    component.ngOnInit();
  
    // Assert
    expect(component.getPhotos).toHaveBeenCalledWith(component.page);
    expect(component.getFavoriteImages).toHaveBeenCalled();
  });

  fit('should populate galleryImages and set isLoading to false after fetching photos', () => {
    // Arrange
    const mockImages: imageI[] = [{
      author:'test1',
    download_url:'https://example.com/photo1.jpg',
    height:3000,
    id:'1',
    url:'https://example.com/photo1.jpg',
    width:5000
  },
    {
      author:'test2',
    download_url:'https://example.com/photo2.jpg',
    height:2000,
    id:'1',
    url:'https://example.com/photo2.jpg',
    width:4500
  }];
   
  spyOn(component.getImages, 'getPhotos').and.returnValue(of(mockImages));
  
    // Act
    component.getPhotos(1);
  
    // Assert
    expect(component.isLoading).toBe(false);
    expect(component.galleryImages).toEqual(mockImages);
  });
  fit('should add photo to favoriteImages and display success toastr message', () => {
    // Arrange
    const mockPhoto: imageI = {
      author:'test1',
    download_url:'https://example.com/photo1.jpg',
    height:3000,
    id:'1',
    url:'https://example.com/photo1.jpg',
    width:5000
  };
    spyOn(component.toastr, 'success');
    
    // Act
    component.addToFavorites(mockPhoto);
    fixture.detectChanges();

    expect(component.favoriteImages).toContain(mockPhoto);
    // expect(component.toastr.success).toHaveBeenCalledWith('Added to Favorites!');
    // expect(component.toastr.success).toHaveBeenCalled(); 
    });
  
  fit('should not add duplicate photo to favoriteImages and display warning toastr message', () => {
    // Arrange
    const mockPhoto: imageI = { author:'test1',
    download_url:'https://example.com/photo1.jpg',
    height:3000,
    id:'1',
    url:'https://example.com/photo1.jpg',
    width:5000};
    component.favoriteImages = [mockPhoto];
    spyOn(component.toastr, 'warning');
    
    // Act
    component.addToFavorites(mockPhoto);
  
    // Assert
    expect(component.favoriteImages.length).toBe(1);
    expect(component.toastr.warning).toHaveBeenCalledWith('Already exists!');
  });
  
});
