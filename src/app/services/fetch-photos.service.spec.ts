import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FetchPhotosService } from './fetch-photos.service';
import { imageI } from '../interfaces/imageI.interface';

fdescribe('FetchPhotosService', () => {
  let service: FetchPhotosService;
  let httpMock:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[FetchPhotosService]
    });
    service = TestBed.inject(FetchPhotosService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify(); 
  });


  it('should retrieve the photos correctly', () => {
    const mockPhotos:imageI[]=[
      {
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
    }
    ];
    const page = 1;
  
    let photos: imageI[] | undefined;
  
    service.getPhotos(page).subscribe(data => {
      photos = data;
    });
  
    const req = httpMock.expectOne(`https://picsum.photos/v2/list?page=${page}&limit=15`);
    expect(req.request.method).toBe('GET');
  
    req.flush(mockPhotos);
  
    expect(photos).toBeDefined();
    expect(photos!.length).toBe(mockPhotos.length);
    expect(photos).toEqual(mockPhotos);
  });



});