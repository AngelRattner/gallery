import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ImageInfoService } from "../services/image-info.service";
import { Photo } from "../classes/photo";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LocationService } from "../services/location.service";
import { CookieService } from 'ngx-cookie-service';
import * as _ from 'lodash';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  pic: string;

  angForm: FormGroup;
  // categoryChecked = true;

  myForm: FormGroup;
  disabled = false;
  ShowFilter = true;
  showAll = true;
  limitSelection = false;
  disableBangalore = true;
  cities: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings: IDropdownSettings = {};
  dropDownList = [];

  locationBool: boolean = true;
  div1: boolean = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private capFB: FormBuilder,
    private service: ImageInfoService,
    private locationService: LocationService,
    private cookieService: CookieService
  ) { this.createForm(); }

  createForm() {
    this.angForm = this.fb.group({
      caption: ['', Validators.required],
      categories: [''],
    });
  }
  ngOnInit(): void {
    this.enableLocation();
    this.service.getCategory().subscribe( e => this.cities = e)
    this.dropDownList = this.cities;
    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll: this.showAll,
      allowSearchFilter: this.ShowFilter
    };
    this.myForm = this.fb.group({
      categories: [this.selectedItems]
    });
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
  }
  //multi selection drop down functions:
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    this.selectedItems.push(item.item_text);
  }
  onItemDeSelect(item: any) {
    console.log('onItem DeSelect', item);
    // console.log('form model', this.myForm.get('city').value);
    this.selectedItems.splice(item.item_text, 1)
  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
    if (this.selectedItems.length = 10) {
      this.selectedItems.splice(0, 9)
    } else {
      this.selectedItems.push(items.item_text);
    }
  }

  //image details functions:

  showFunction() {
    this.div1 = true;
  }

  hideFunction() {
    this.div1 = false;
  }

  //image saving functions:
  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.pic = this.fileInputLabel;
    this.fileUploadForm.get('uploadedImage').setValue(file);
  }


  onFormSubmit(caption: string, isFavorite: boolean, isPrivate: boolean) {
    const photosClass = new Photo(caption, this.selectedItems, this.locationService.selectedLat, this.locationService.selectedLng, isFavorite, isPrivate, this.uploadFileInput.nativeElement.value)
    const id = photosClass.id
    if (!this.fileUploadForm.get('uploadedImage').value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value, id);

    this.http
      .post<any>('http://localhost:3000/uploadfile', formData).subscribe(response => {
        console.log(response);
        if (response.statusCode === 200) {
          this.submit(photosClass)
          this.fileInputLabel = undefined;
        }
      }, er => {
        console.log(er);
        alert(er.error.error);
      });
  }

  submit(photosClass) {

    this.http
      .post<any>('http://localhost:3000/saveDetails', { photosClass }).subscribe(response => {
        console.log(response);
        if (response.statusCode === 200) {
          console.log("information & image was saved");
        }
      }, er => {
        console.log(er);
        alert(er.error.error);
      });
  }

  enableLocation(){
    if(this.cookieService.get('locationCheck') == "trueLocation"){
      this.locationBool = false;
    }else{
      this.locationBool = true;
    }
  }

  getCurrentLocation() {
    // this if exist becurse the user can deny access to location
    if (navigator.geolocation) {
      //getting current latitude & longitude using web api
      navigator.geolocation.getCurrentPosition(position => {
        this.locationService.selectedLat = position.coords.latitude;
        this.locationService.selectedLng = position.coords.longitude;
      });
    }
  }

}

