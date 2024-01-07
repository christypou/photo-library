import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, mergeMap, timer } from 'rxjs';
import { imageI } from '../interfaces/imageI.interface';

@Injectable({
  providedIn: 'root'
})
export class FetchPhotosService implements OnInit{

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  getPhotos(page:number):Observable<imageI[]>{
    const params = new HttpParams().set('page', page.toString()).set('limit', '15');
    const randomDelay = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
    return timer(randomDelay).pipe(
      mergeMap(() => this.http.get<imageI[]>('https://picsum.photos/v2/list', { params }))
    );
    // for testing purposes
    // return this.http.get<imageI[]>('https://picsum.photos/v2/list', { params })
  }

}


