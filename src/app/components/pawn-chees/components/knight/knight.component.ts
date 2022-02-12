import { Component, Input, OnInit } from '@angular/core';
import { CheesBox } from 'src/app/components/chees-box/class/chees-box';
import { IPawnChees, IPawnTeam } from '../../interface/pawn-chees';
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
  @Input() color!: IPawnTeam | undefined;
  IPawnTeam = IPawnTeam;

  constructor() {
  }

  setCheesBoxMovable(board: CheesBox[][], row: number, column: number, isFirstMove: boolean) {
    
  }

  ngOnInit(): void {
  }

}
