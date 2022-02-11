import { Component, Input, OnInit } from '@angular/core';
import { IPawnBase, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_BASE } from '../pawn-chees.token';

@Component({
  selector: 'rook',
  templateUrl: './rook.component.html',
  styleUrls: ['./rook.component.scss'],
  providers: [
    {
      provide: PAWN_BASE,
      useExisting: RookComponent
    }
  ]
})
export class RookComponent implements OnInit, IPawnBase {
  @Input() color: IPawnTeam | undefined;
  IPawnTeam = IPawnTeam;

  constructor() {
  }

  move() {
  }

  selected() {
    console.log('rook');
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
