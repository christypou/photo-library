import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { imageI } from 'src/app/interfaces/imageI.interface';
import { MatGridListModule } from '@angular/material/grid-list';

fdescribe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      imports: [MatGridListModule],
    });
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should initialize favoriteImages as an empty array', () => {
    expect(component.favoriteImages).toEqual([]);
  });

  fit('should retrieve favorite images from localStorage on initialization', () => {
    const mockImages: imageI[] = [
      {
        author: 'test1',
        download_url: 'https://example.com/photo1.jpg',
        height: 3000,
        id: '1',
        url: 'https://example.com/photo1.jpg',
        width: 5000,
      },
      {
        author: 'test2',
        download_url: 'https://example.com/photo2.jpg',
        height: 2000,
        id: '2',
        url: 'https://example.com/photo2.jpg',
        width: 4500,
      },
    ];
    const localStorageMock = spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockImages));

    component.ngOnInit();

    expect(localStorageMock).toHaveBeenCalledWith('favorite');
    expect(component.favoriteImages).toEqual(mockImages);
  });

  fit('should not retrieve favorite images if localStorage is empty', () => {
    const localStorageMock = spyOn(localStorage, 'getItem').and.returnValue(null);

    component.ngOnInit();

    expect(localStorageMock).toHaveBeenCalledWith('favorite');
    expect(component.favoriteImages).toEqual([]);
  });
});
