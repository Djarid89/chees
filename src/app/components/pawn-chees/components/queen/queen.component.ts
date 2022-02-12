import { Component, Input, OnInit } from '@angular/core';
import { ICheesBox, IPawnChees, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_CHEES } from '../pawn-chees.token';

@Component({
  selector: 'queen',
  templateUrl: './queen.component.html',
  styleUrls: ['./queen.component.scss'],
  providers: [
    {
      provide: PAWN_CHEES,
      useExisting: QueenComponent
    }
  ]
})
export class QueenComponent implements OnInit, IPawnChees {
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
