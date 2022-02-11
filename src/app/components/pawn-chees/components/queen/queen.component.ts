import { Component, Input, OnInit } from '@angular/core';
import { IPawnChees, IPawnMove, IPawnTeam } from '../../interface/pawn-chees';
import { PawnCheesComponent } from '../../pawn-chees.component';

@Component({
  selector: 'queen',
  templateUrl: './queen.component.html',
  styleUrls: ['./queen.component.scss']
})
export class QueenComponent extends PawnCheesComponent implements OnInit, IPawnMove {
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
