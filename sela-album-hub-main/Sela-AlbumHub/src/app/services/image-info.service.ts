import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageInfoService {
  photo

  constructor(
    private http: HttpClient
  ) {}

  getCategory(): Observable<any[]> {
    return this.http.get('http://localhost:3000/getCategory')
      .pipe(map((res) => <any>(res)));
  }

  addCategory(name: object) {

    this.http
      .post<any>(`http://localhost:3000/addCategory`, {name}).subscribe(response => {
        console.log(response);
        if (response.statusCode === 200) {
          alert("category added ")
        }
      }, er => {
        console.log(er);
        alert(er.error.error);
      });
  }
}


