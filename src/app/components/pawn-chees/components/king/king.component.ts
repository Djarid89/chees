import { Component, Input, OnInit } from '@angular/core';
import { CheesBox } from 'src/app/components/chees-box/class/chees-box';
import { IPawnChees, IPawnTeam } from '../../interface/pawn-chees';
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
  @Input() color!: IPawnTeam | undefined;
  IPawnTeam = IPawnTeam;

  constructor() {
  }

  setCheesBoxMovable(board: CheesBox[][], row: number, column: number, isFirstMove: boolean) {
    
  }
  
  ngOnInit(): void {
  }

}
