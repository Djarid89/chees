import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../../../service/connector.service';
import { IBoardColor, ICheesBoardColor } from '../../../../shared/interface/shared';
import { CheesBox } from '../../../chees-box/class/chees-box';
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
  @Input() type!: IPawnCheesType | undefined;
  @Input() color: IPawnTeam  | undefined;
  @Input() doubleMove: boolean  | undefined;
  updateAllCanEatableSubs!: Subscription;
  tryDefendKing! : Subscription;

  constructor(private readonly connector: ConnectorService) {
    super();
  }

  ngOnDestroy(): void {
    this.updateAllCanEatableSubs.unsubscribe();
    this.tryDefendKing.unsubscribe();
  }

  ngOnInit(): void {
    this.updateAllCanEatableSubs = this.connector.updateAllCanBeEatable$.subscribe({
      next: (boardColor: IBoardColor) => {
        if(boardColor.color === this.color) {
          this.setCheesBoxesCanEat(boardColor.board);
        }
      }
    });
    this.tryDefendKing = this.connector.tryDefendKing$.subscribe({
      next: (cheesBoardColor: ICheesBoardColor) => {
        if(cheesBoardColor.color === this.color && super.cannotFreeKing(cheesBoardColor, this, this.connector.updateAllCanBeEatable$)) {
          this.connector.kingIsBlock$.next();
        }
      }
    });
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
    if(this.doubleMove && (_doubleRow <= 7 && _doubleRow >= 0)) {
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
