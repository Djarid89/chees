import { Component, Input, OnInit } from '@angular/core';
import { IPawnCheesExtended, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_EXTENDED } from '../pawn-chees.token';

@Component({
  selector: 'knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.scss'],
  providers: [
    {
      provide: PAWN_EXTENDED,
      useExisting: KnightComponent
    }
  ]
})
export class KnightComponent implements OnInit, IPawnCheesExtended {
  @Input() color: IPawnTeam | undefined;
  IPawnTeam = IPawnTeam;

  constructor() {
  }

  move() {
  }

  showAvaibleMove() {
    console.log('knight');
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
