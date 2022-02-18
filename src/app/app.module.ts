import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ChessboardComponent } from './components/chessboard/chessboard.component';
import { HorizontalBarComponent } from './components/horizontal-bar/horizontal-bar.component';
import { VerticalBarComponent } from './components/vertical-bar/vertical-bar.component';
import { CheesBoxComponent } from './components/chees-box/chees-box.component';
import { PawnCheesComponent } from './components/pawn-chees/pawn-chees.component';
import { PawnComponent } from './components/pawn-chees/components/pawn/pawn.component';
import { KnightComponent } from './components/pawn-chees/components/knight/knight.component';
import { BishopComponent } from './components/pawn-chees/components/bishop/bishop.component';
import { RookComponent } from './components/pawn-chees/components/rook/rook.component';
import { QueenComponent } from './components/pawn-chees/components/queen/queen.component';
import { KingComponent } from './components/pawn-chees/components/king/king.component';

@NgModule({
  declarations: [
    HomeComponent,
    ChessboardComponent,
    HorizontalBarComponent,
    VerticalBarComponent,
    CheesBoxComponent,
    PawnCheesComponent,
    PawnComponent,
    KnightComponent,
    BishopComponent,
    RookComponent,
    QueenComponent,
    KingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
