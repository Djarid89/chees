import { Component, Input, OnInit } from '@angular/core';
import { IPawnChees, IPawnMove, IPawnTeam } from '../../interface/pawn-chees';
import { PawnCheesComponent } from '../../pawn-chees.component';

@Component({
  selector: 'knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.scss']
})
export class KnightComponent extends PawnCheesComponent implements OnInit, IPawnMove {
  @Input() pawnchees!: IPawnChees;
  IPawnTeam = IPawnTeam;

  constructor() {
    super();
  }

  move() {

  }

  ngOnInit(): void {
  }

}
