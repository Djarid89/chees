import { Component, Input } from '@angular/core';
import { CheesBox } from 'src/app/components/chees-box/class/chees-box';
import { IPawnChees, IPawnCheesType, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_CHEES } from '../pawn-chees.token';

@Component({
  selector: 'pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.scss'],
  providers: [
    {
      provide: PAWN_CHEES,
      useExisting: PawnComponent
    }
  ]
})
export class PawnComponent implements IPawnChees {
  @Input() color!: IPawnTeam;
  IPawnTeam = IPawnTeam;

  setCheesBoxMovable(board: CheesBox[][], row: number, column: number, isFirstMove: boolean): void {
    if(this.color === IPawnTeam.black) {
      if(row + 1 <= 7) {
        this.setMovable(board[row + 1][column]);
      }
      if(isFirstMove && row + 2 <= 7) {
        this.setMovable(board[row + 2][column]);
      }
    } else {
      if(row - 1 >= 0) {
        this.setMovable(board[row - 1][column]);
      }
      if(isFirstMove && row - 2 >= 0) {
        this.setMovable(board[row - 2][column]);
      }
    }
  }

  private setMovable(cheesBox: CheesBox): void {
    cheesBox.isMoveable = cheesBox.pawnChees === null;
  }
}
