import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoComponent } from './photo.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoComponent],
      imports: [RouterTestingModule, ToastrModule.forRoot()], // Import the RouterTestingModule
      providers: [
        ToastrService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }), // Simulate ActivatedRoute params
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should retrieve image information from favorites', () => {
    const sampleImage = {
      author: 'test1',
      download_url: 'https://example.com/photo1.jpg',
      height: 3000,
      id: '1',
      url: 'https://example.com/photo1.jpg',
      width: 5000,
    };
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify([sampleImage])
    );
    component.ngOnInit();
    expect(component.selectedImage).toEqual(sampleImage);
  });

  fit('should handle when image is not found in favorites', () => {
    spyOn(toastrService, 'error');
    spyOn(router, 'navigate');
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([]));
    component.ngOnInit();
    expect(toastrService.error).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/not-found']);
  });

  fit('should delete photo from favorites and navigate to /favorites', () => {
    const sampleImage = {
      author: 'test1',
      download_url: 'https://example.com/photo1.jpg',
      height: 3000,
      id: '1',
      url: 'https://example.com/photo1.jpg',
      width: 5000,
    };
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify([sampleImage])
    );
    spyOn(localStorage, 'setItem');
    spyOn(toastrService, 'success');
    spyOn(router, 'navigate');
    component.deletePhoto('1');
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(toastrService.success).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/favorites']);
  });
});
