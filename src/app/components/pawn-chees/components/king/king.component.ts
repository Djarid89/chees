import { Component, Input, OnInit } from '@angular/core';
import { ICheesBox, IPawnChees, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_CHEES } from '../pawn-chees.token';

@Component({
  selector: 'king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.scss'],
  providers: [
    {
      provide: PAWN_CHEES,
      useExisting: KingComponent
    }
  ]
})
export class KingComponent implements OnInit, IPawnChees {
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
