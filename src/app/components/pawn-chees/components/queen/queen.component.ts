import { Component, Input, OnInit } from '@angular/core';
import { IPawnBase, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_BASE } from '../pawn-chees.token';

@Component({
  selector: 'queen',
  templateUrl: './queen.component.html',
  styleUrls: ['./queen.component.scss'],
  providers: [
    {
      provide: PAWN_BASE,
      useExisting: QueenComponent
    }
  ]
})
export class QueenComponent implements OnInit, IPawnBase {
  @Input() color: IPawnTeam | undefined;
  IPawnTeam = IPawnTeam;

  constructor() {
  }

  move() {
  }

  selected() {
    console.log('queen');
  }

  unselected() {
  }

  eat() {
  }

  beEaten() {

  }

  ngOnInit(): void {
  }

}
