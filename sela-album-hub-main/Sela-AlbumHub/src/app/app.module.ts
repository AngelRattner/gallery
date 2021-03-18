import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { OptionPageComponent } from './option-page/option-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { AddImagePageComponent } from './add-image-page/add-image-page.component';
import { CameraComponent } from './camera/camera.component';
import { LocalComponent } from './local/local.component';
import { OnlineComponent } from './online/online.component';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageInfoComponent } from './image-info/image-info.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ContainerComponent } from './container/container.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { AgmCoreModule } from '@agm/core';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CookieService } from 'ngx-cookie-service';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { SlideContainerComponent } from './slide-container/slide-container.component';
import { FilterPipe } from './services/filter.pipe';
import { EncrDecrServiceService } from './services/encr-decr-service.service';
import { LogInComponent } from './log-in/log-in.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OnlineContainerComponent } from './online-container/online-container.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    OptionPageComponent,
    DetailPageComponent,
    AddImagePageComponent,
    CameraComponent,
    LocalComponent,
    OnlineComponent,
    GalleryPageComponent,
    ImageInfoComponent,
    ContainerComponent,
    GoogleMapComponent,
    ErrorPageComponent,
    SlideShowComponent,
    SlideContainerComponent,
    FilterPipe,
    LogInComponent,
    EditPageComponent,
    OnlineContainerComponent,
    EditCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    WebcamModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPur4RgsX93dfbQk7RDW5YqDx-K13UEfc',
      libraries: ['places'] // get your api key from google
    }),
  ],
  providers: [
    CookieService,
    EncrDecrServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
