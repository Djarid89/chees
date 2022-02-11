import { Component, Input, OnInit } from '@angular/core';
import { IPawnBase, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_BASE } from '../pawn-chees.token';

@Component({
  selector: 'knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.scss'],
  providers: [
    {
      provide: PAWN_BASE,
      useExisting: KnightComponent
    }
  ]
})
export class KnightComponent implements OnInit, IPawnBase {
  @Input() color: IPawnTeam | undefined;
  IPawnTeam = IPawnTeam;

  constructor() {
  }

  move() {
  }

  selected() {
    console.log('knight');
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
