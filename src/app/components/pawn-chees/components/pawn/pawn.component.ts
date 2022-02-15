import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../../../service/connector.service';
import { IBoardColor } from '../../../../shared/interface/shared';
import { CheesBox } from '../../../chees-box/class/chees-box';
import { Cheesboard } from '../../../chessboard/class/cheesBoard';
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
export class PawnComponent extends BasePawnChees implements OnInit, OnDestroy, IPawnChees {
  @Input() row!: number;
  @Input() column!: number;
  @Input() type!: IPawnCheesType;
  @Input() color!: IPawnTeam;
  updateAllCanEatSubs!: Subscription;

  constructor(private readonly connector: ConnectorService) {
    super();
  }

  ngOnDestroy(): void {
    this.updateAllCanEatSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.updateAllCanEatSubs = this.connector.updateAllCanEat$.subscribe({
      next: (boardColor: IBoardColor) => {
        if(boardColor.color === this.color) {
          this.setCheesBoxesCanEat(boardColor.board);
          this.connector.isKingUnderCheck$.next(boardColor);
        }
      }
    })
  }

  setCheesBoxesStatus(board: CheesBox[][], row: number, column: number): void {
    const _row = this.color === IPawnTeam.black ? row + 1 : row - 1;
    const _doubleRow = this.color === IPawnTeam.black ? row + 2 : row - 2;
    if(_row <= 7 && _row >= 0) {
      board[_row][column].isMoveable = board[_row][column].pawnChees === null;
      if(column + 1 <= 7) {
        board[_row][column + 1].isEatable = this.isOppositeColor(board[_row][column + 1], this.color);
      }
      if(column - 1 >= 0) {
        board[_row][column - 1].isEatable = this.isOppositeColor(board[_row][column - 1], this.color);
      }
    }
    if((Cheesboard.isFirstMoveBlack &&  _doubleRow <= 7) || Cheesboard.isFirstMoveWhite && row - 2 >= 0) {
      board[_doubleRow][column].isMoveable = board[_doubleRow][column].pawnChees === null;
    }
}

  setCheesBoxesCanEat(board: CheesBox[][]): void {
    const _row = this.color === IPawnTeam.black ? this.row + 1 : this.row - 1;
    if(_row <= 7 && _row >= 0) {
      if(this.column + 1 <= 7) {
        board[_row][this.column + 1].canBeEatable = true;
      }
      if(this.column - 1 >= 0) {
        board[_row][this.column - 1].canBeEatable = true;
      }
    }
  }
}
