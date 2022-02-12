import { Component, Input, OnInit } from '@angular/core';
import { ICheesBox, IPawnChees, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_CHEES } from '../pawn-chees.token';

@Component({
  selector: 'bishop',
  templateUrl: './bishop.component.html',
  styleUrls: ['./bishop.component.scss'],
  providers: [
    {
      provide: PAWN_CHEES,
      useExisting: BishopComponent
    }
  ]
})
export class BishopComponent implements IPawnChees {
  @Input() color: IPawnTeam | undefined;
  IPawnTeam = IPawnTeam;

  setCheesBoxMovable(board: ICheesBox[][], row: number, column: number, isFirstMove: boolean) {
    
  }

  setMovable(board: ICheesBox, isMoveable: boolean) {
    
  }
}
