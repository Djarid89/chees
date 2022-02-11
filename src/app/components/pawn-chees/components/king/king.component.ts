import { Component, Input, OnInit } from '@angular/core';
import { IPawnBase, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_BASE } from '../pawn-chees.token';

@Component({
  selector: 'king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.scss'],
  providers: [
    {
      provide: PAWN_BASE,
      useExisting: KingComponent
    }
  ]
})
export class KingComponent implements OnInit, IPawnBase {
  @Input() color: IPawnTeam | undefined;
  IPawnTeam = IPawnTeam;

  constructor() {
  }

  move() {
  }

  selected() {
    console.log('king');
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
