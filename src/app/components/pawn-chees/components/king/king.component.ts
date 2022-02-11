import { Component, Input, OnInit } from '@angular/core';
import { IPawnChees, IPawnMove, IPawnTeam } from '../../interface/pawn-chees';
import { PawnCheesComponent } from '../../pawn-chees.component';

@Component({
  selector: 'king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.scss']
})
export class KingComponent extends PawnCheesComponent implements OnInit, IPawnMove {
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
