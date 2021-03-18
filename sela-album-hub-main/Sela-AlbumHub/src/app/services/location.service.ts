import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  selectedLat;
  selectedLng;
  constructor() { }
}
