import { Component, Input, OnInit } from '@angular/core';
import { IPawnChees, IPawnMove, IPawnTeam } from '../../interface/pawn-chees';
import { PawnCheesComponent } from '../../pawn-chees.component';

@Component({
  selector: 'rook',
  templateUrl: './rook.component.html',
  styleUrls: ['./rook.component.scss']
})
export class RookComponent extends PawnCheesComponent implements OnInit, IPawnMove {
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
