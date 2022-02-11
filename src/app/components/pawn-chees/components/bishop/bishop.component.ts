import { Component, Input, OnInit } from '@angular/core';
import { IPawnChees, IPawnMove, IPawnTeam } from '../../interface/pawn-chees';
import { PawnCheesComponent } from '../../pawn-chees.component';

@Component({
  selector: 'bishop',
  templateUrl: './bishop.component.html',
  styleUrls: ['./bishop.component.scss']
})
export class BishopComponent extends PawnCheesComponent implements OnInit, IPawnMove {
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
