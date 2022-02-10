import { Component, OnInit } from '@angular/core';
import { IPawn, IPawnMove } from '../../interface/pawn-chees';
import { PawnCheesComponent } from '../../pawn-chees.component';

@Component({
  selector: 'pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.scss']
})
export class PawnComponent extends PawnCheesComponent implements OnInit, IPawnMove, IPawn {

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
