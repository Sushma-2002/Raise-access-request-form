import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AccessRequestComponent } from '././access-request/access-request.component';

import { AccessRequestService } from '././access-request.service';

 

 

@NgModule({

  declarations: [

    AppComponent,

    AccessRequestComponent

  ],

  imports: [

    BrowserModule,

    FormsModule,

   

  ],

  providers: [AccessRequestService],

  bootstrap: [AppComponent]

})

export class AppModule { }

 