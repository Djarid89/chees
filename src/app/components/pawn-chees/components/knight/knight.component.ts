import { Component, Input, OnInit } from '@angular/core';
import { ICheesBox, IPawnChees, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_CHEES } from '../pawn-chees.token';

@Component({
  selector: 'knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.scss'],
  providers: [
    {
      provide: PAWN_CHEES,
      useExisting: KnightComponent
    }
  ]
})
export class KnightComponent implements OnInit, IPawnChees {
  @Input() color: IPawnTeam | undefined;
  IPawnTeam = IPawnTeam;

  constructor() {
  }

  setCheesBoxMovable(board: ICheesBox[][], row: number, column: number, isFirstMove: boolean) {
    
  }

  setMovable(board: ICheesBox, isMoveable: boolean) {
    
  }

  ngOnInit(): void {
  }

}
