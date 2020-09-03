import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatSliderModule} from '@angular/material/slider';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InputFormComponent } from './input-form/input-form.component';
import { RouterModule,Routes } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    InputFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatSliderModule, 
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      

    ])
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
