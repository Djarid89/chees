import { Component, Input } from '@angular/core';
import { CheesBox } from 'src/app/components/chees-box/class/chees-box';
import { IPawnChees, IPawnCheesType, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_CHEES } from '../pawn-chees.token';

@Component({
  selector: 'queen',
  templateUrl: './queen.component.html',
  styleUrls: ['./queen.component.scss'],
  providers: [
    {
      provide: PAWN_CHEES,
      useExisting: QueenComponent
    }
  ]
})
export class QueenComponent implements IPawnChees {
  @Input() type!: IPawnCheesType;
  @Input() color!: IPawnTeam;
  IPawnTeam = IPawnTeam;

  setCheesBoxMovable(board: CheesBox[][], row: number, column: number) {
    
  }
}
