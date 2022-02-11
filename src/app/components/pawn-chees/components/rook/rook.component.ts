import { Component, Input, OnInit } from '@angular/core';
import { IPawnCheesExtended, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_EXTENDED } from '../pawn-chees.token';

@Component({
  selector: 'rook',
  templateUrl: './rook.component.html',
  styleUrls: ['./rook.component.scss'],
  providers: [
    {
      provide: PAWN_EXTENDED,
      useExisting: RookComponent
    }
  ]
})
export class RookComponent implements OnInit, IPawnCheesExtended {
  @Input() color: IPawnTeam | undefined;
  IPawnTeam = IPawnTeam;

  constructor() {
  }

  move() {
  }

  showAvaibleMove() {
    console.log('rook');
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
