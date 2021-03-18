import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable,throwError } from 'rxjs';  
import {catchError} from 'rxjs/operators';  

const httpOptions={  
  headers : new HttpHeaders({  
    'Authorization':'563492ad6f917000010000015e4bd0e27f1c4431ae4c11294f5a148e'  
  })  
}  

@Injectable({
  providedIn: 'root'
})
export class OnlineSearchService {

  constructor(private http:HttpClient) { }

  getdata(search,perPage):Observable<any>{  
    const url="https://api.pexels.com/v1/search?query="+search+"&per_page="+perPage;  
    return this.http.get<any>(url,httpOptions).pipe(catchError(this.handelError));  
  }  
  handelError(error){  
    return throwError(error.message || "Server Error");  
  }  
  
}
