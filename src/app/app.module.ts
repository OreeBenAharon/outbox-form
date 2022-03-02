import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';

// import { MaterialFileInputModule } from 'ngx-material-file-input';
// import {MatInputModule} from '@angular/material/input';
import {MatInputModule} from '@angular/material/input';
import { FirstComponent } from './components/first/first.component';
import { EmailerComponent } from './components/emailer/emailer.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FirstComponent,
    EmailerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    // MaterialFileInputModule,

    // NgxMatFileInputModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
