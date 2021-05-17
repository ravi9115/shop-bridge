import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppTableModule } from '@app/table';
import { NotifyService, RequestFactory, SharedModule, HttpService } from '@app/shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot(),
    SharedModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppTableModule,
    HttpClientModule,
  ],
  providers: [RequestFactory, HttpService, NotifyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
