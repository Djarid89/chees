import { Component, Input, OnInit } from '@angular/core';
import { ICheesBox, IPawnChees, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_CHEES } from '../pawn-chees.token';

@Component({
  selector: 'rook',
  templateUrl: './rook.component.html',
  styleUrls: ['./rook.component.scss'],
  providers: [
    {
      provide: PAWN_CHEES,
      useExisting: RookComponent
    }
  ]
})
export class RookComponent implements OnInit, IPawnChees {
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
