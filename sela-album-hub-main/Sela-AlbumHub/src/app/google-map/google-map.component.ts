import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { google } from "google-maps";
import { Photo } from '../classes/photo';
import { LocationService } from "../services/location.service";


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit, OnDestroy {

  @Input()
  lat: number
  @Input()
  lng: number

  destroyed: boolean = false;

  constructor(
    private ref: ChangeDetectorRef,
    private locationService: LocationService
  ) {}

  ngOnDestroy(): void {
    this.destroyed = true;
  }

  ngOnInit(): void {
  }

  placeMarkerAndPanTo(latLng: google.maps.LatLng, map: google.maps.Map) {
    // sets the location to where the user clicked
    this.lat = latLng.lat();
    this.lng = latLng.lng();

    console.log(this.lat)
    console.log(this.lng)

    this.locationService.selectedLat = this.lat
    this.locationService.selectedLng = this.lng

    // make sure to update component
    if (!this.destroyed)
      this.ref.detectChanges();
  }

  // on map ready
  mapReady(map) {
    // add event listener to click on map
    map.addListener("click", (e) => {
      // pass clicked position and the map ref
      this.placeMarkerAndPanTo(e.latLng, map);
    });
  }
}

