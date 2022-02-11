import { Component, Input, OnInit } from '@angular/core';
import { IPawnBase, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_BASE } from '../pawn-chees.token';

@Component({
  selector: 'pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.scss'],
  providers: [
    {
      provide: PAWN_BASE,
      useExisting: PawnComponent
    }
  ]
})
export class PawnComponent implements OnInit, IPawnBase {
  @Input() color: IPawnTeam | undefined;
  IPawnTeam = IPawnTeam;

  constructor() {
  }

  move() {
  }

  selected() {
    console.log('pawn');
  }

  unselected() {
  }

  eat() {
  }

  beEaten() {

  }

  transform() {

  }

  ngOnInit(): void {
  }

}
