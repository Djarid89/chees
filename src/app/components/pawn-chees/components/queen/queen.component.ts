import { Component, Input, OnInit } from '@angular/core';
import { IPawnCheesExtended, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_EXTENDED } from '../pawn-chees.token';

@Component({
  selector: 'queen',
  templateUrl: './queen.component.html',
  styleUrls: ['./queen.component.scss'],
  providers: [
    {
      provide: PAWN_EXTENDED,
      useExisting: QueenComponent
    }
  ]
})
export class QueenComponent implements OnInit, IPawnCheesExtended {
  @Input() color: IPawnTeam | undefined;
  IPawnTeam = IPawnTeam;

  constructor() {
  }

  move() {
  }

  showAvaibleMove() {
    console.log('queen');
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
