import { Component, Input, OnInit } from '@angular/core';
import { IPawnCheesExtended, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_EXTENDED } from '../pawn-chees.token';

@Component({
  selector: 'bishop',
  templateUrl: './bishop.component.html',
  styleUrls: ['./bishop.component.scss'],
  providers: [
    {
      provide: PAWN_EXTENDED,
      useExisting: BishopComponent
    }
  ]
})
export class BishopComponent implements OnInit, IPawnCheesExtended {
  @Input() color: IPawnTeam | undefined;
  IPawnTeam = IPawnTeam;

  constructor() {
  }

  move() {
  }

  showAvaibleMove() {
    console.log('bishop');
  }

  drop() {
  }

  eat() {
  }

  beEaten() {

  }

  ngOnInit(): void {
  }

}
