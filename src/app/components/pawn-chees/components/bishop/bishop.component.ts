import { Component, Input, OnInit } from '@angular/core';
import { CheesBox, PawnChees } from 'src/app/components/chees-box/class/chees-box';
import { IPawnChees, IPawnTeam } from '../../interface/pawn-chees';
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
  @Input() pawnChees!: PawnChees;
  IPawnTeam = IPawnTeam;

  setCheesBoxMovable(board: CheesBox[][], row: number, column: number) {
    
  }
}
