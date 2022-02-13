import { Component, Input } from '@angular/core';
import { CheesBox, PawnChees } from 'src/app/components/chees-box/class/chees-box';
import { Cheesboard } from 'src/app/components/chessboard/class/cheesBoard';
import { BasePawnChees } from '../../class/base-pawn-chees';
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
export class PawnComponent extends BasePawnChees implements IPawnChees {
  @Input() type!: IPawnCheesType;
  @Input() color!: IPawnTeam;

  setCheesBoxesMovable(board: CheesBox[][], row: number, column: number): void {
    if(this.color === IPawnTeam.black) {
      if(row + 1 <= 7) {
        board[row + 1][column].isMoveable = board[row + 1][column].pawnChees === null;
        if(column + 1 <= 7 && column - 1 >= 0) {
          board[row + 1][column + 1].isEatable = false;
          if(board[row + 1][column + 1].pawnChees) {
            board[row + 1][column + 1].isEatable = board[row + 1][column + 1].pawnChees?.color !== this.color; 
          }
          board[row + 1][column - 1].isEatable = false;
          if(board[row + 1][column - 1].pawnChees) {
            board[row + 1][column - 1].isEatable = board[row + 1][column - 1].pawnChees?.color !== this.color; 
          }
        }
      }
      if(Cheesboard.isFirstMoveBlack && row + 2 <= 7) {
        board[row + 2][column].isMoveable = board[row + 2][column].pawnChees === null;
      }
    } else {
      if(row - 1 >= 0) {
        board[row - 1][column].isMoveable = board[row - 1][column].pawnChees === null;
        if(column + 1 <= 7 && column - 1 >= 0) {
          board[row - 1][column + 1].isEatable = false;
          if(board[row - 1][column + 1].pawnChees) {
            board[row - 1][column + 1].isEatable = board[row - 1][column + 1].pawnChees?.color !== this.color; 
          }
          board[row - 1][column - 1].isEatable = false;
          if(board[row - 1][column - 1].pawnChees) {
            board[row - 1][column - 1].isEatable = board[row - 1][column - 1].pawnChees?.color !== this.color; 
          }
        }
      }
      if(Cheesboard.isFirstMoveWhite && row - 2 >= 0) {
        board[row - 2][column].isMoveable = board[row - 2][column].pawnChees === null;
      }
    }
  }
}
