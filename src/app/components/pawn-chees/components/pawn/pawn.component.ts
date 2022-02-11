import { Component, Input, OnInit } from '@angular/core';
import { IPawn, IPawnChees, IPawnMove, IPawnTeam } from '../../interface/pawn-chees';
import { PawnCheesComponent } from '../../pawn-chees.component';

@Component({
  selector: 'pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.scss']
})
export class PawnComponent extends PawnCheesComponent implements OnInit, IPawnMove, IPawn {
  @Input() pawnchees!: IPawnChees;
  IPawnTeam = IPawnTeam;

  constructor() {
    super();
  }

  move() {

  }

  transform() {

  }

  ngOnInit(): void {
  }

}
