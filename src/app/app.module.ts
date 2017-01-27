import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DataService } from './services/data.service';

import { ToastComponent } from './shared/toast/toast.component';
import { RunItComponent } from './run-it/run-it.component';
import { StaticsComponent } from './statics/statics.component';

const routing = RouterModule.forRoot([
    { path: '',      component: HomeComponent },
    { path: 'about', component: AboutComponent },
    //Added
    { path: 'runit', component: RunItComponent },
    { path: 'statics', component: StaticsComponent }


]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ToastComponent,
    RunItComponent,
    StaticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    DataService,
    ToastComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
