import { Component, Input, OnInit } from '@angular/core';
import { IPawnCheesExtended, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_EXTENDED } from '../pawn-chees.token';

@Component({
  selector: 'king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.scss'],
  providers: [
    {
      provide: PAWN_EXTENDED,
      useExisting: KingComponent
    }
  ]
})
export class KingComponent implements OnInit, IPawnCheesExtended {
  @Input() color: IPawnTeam | undefined;
  IPawnTeam = IPawnTeam;

  constructor() {
  }

  move() {
  }

  showAvaibleMove() {
    console.log('king');
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
