import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { OptionPageComponent } from './option-page/option-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { AddImagePageComponent } from './add-image-page/add-image-page.component';
import { CameraComponent } from './camera/camera.component';
import { LocalComponent } from './local/local.component';
import { OnlineComponent } from './online/online.component';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { ImageInfoComponent } from './image-info/image-info.component';
import { ContainerComponent } from "./container/container.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { SlideShowComponent } from "./slide-show/slide-show.component";
import { SlideContainerComponent } from "./slide-container/slide-container.component";
import { LogInComponent } from "./log-in/log-in.component";
import { EditPageComponent } from "./edit-page/edit-page.component";
import { EditCategoryComponent } from "./edit-category/edit-category.component";

const routes: Routes = [
  {path: '', redirectTo: 'Welcome', pathMatch:'full'},
  {path: 'Welcome', component: WelcomePageComponent},
  {path: 'slide-show', component: SlideContainerComponent},
  {path: 'Options', component: OptionPageComponent},
  {path: 'Details', component: DetailPageComponent},
  {path: 'Gallery', component: ContainerComponent},
  {path: 'Log-in', component: LogInComponent},
  {path: 'Edit-page', component: EditPageComponent},
  {path: 'Edit-category', component: EditCategoryComponent},
  {path: 'image-info', component: ImageInfoComponent},
  
  {
    path: 'Add-image',
     component: AddImagePageComponent,
     children: [
       {
          path: 'camera',
          component: CameraComponent,
       },
       {
        path: 'local',
        component: LocalComponent,
       },
       {
        path: 'online',
        component: OnlineComponent,
       }
     ]
  },
  {path:  '**', component: ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
