import { Component, Input, OnInit } from '@angular/core';
import { IPawnCheesExtended, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_EXTENDED } from '../pawn-chees.token';

@Component({
  selector: 'pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.scss'],
  providers: [
    {
      provide: PAWN_EXTENDED,
      useExisting: PawnComponent
    }
  ]
})
export class PawnComponent implements OnInit, IPawnCheesExtended {
  @Input() color: IPawnTeam | undefined;
  IPawnTeam = IPawnTeam;

  constructor() {
  }

  showAvaibleMove() {
  }


  ngOnInit(): void {
  }

}
