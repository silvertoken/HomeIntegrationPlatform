import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiModule } from './ui/ui.module';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module'
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './core/rest.service'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    FormsModule,
    BrowserAnimationsModule,
    UiModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule
    
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
