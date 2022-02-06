import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ChessboardComponent } from './components/chessboard/chessboard.component';
import { HorizontalBarComponent } from './components/horizontal-bar/horizontal-bar.component';
import { VerticalBarComponent } from './components/vertical-bar/vertical-bar.component';

@NgModule({
  declarations: [
    HomeComponent,
    ChessboardComponent,
    HorizontalBarComponent,
    VerticalBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
