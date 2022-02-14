import { Component, Input, OnInit } from '@angular/core';
import { CheesBox } from 'src/app/components/chees-box/class/chees-box';
import { Cheesboard } from 'src/app/components/chessboard/class/cheesBoard';
import { ConnectorService } from '../../../../service/connector.service';
import { IBoardRowColumn } from '../../../../shared/interface/shared';
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
export class PawnComponent extends BasePawnChees implements OnInit,IPawnChees {
  @Input() type!: IPawnCheesType;
  @Input() color!: IPawnTeam;

  constructor(private readonly connector: ConnectorService) {
    super();
  }

  ngOnInit(): void {
    this.connector.potentialMovePawnChees$.subscribe({
      next: (boardRowColumn: IBoardRowColumn) => this.setCheesBoxesCanEat(boardRowColumn.board, boardRowColumn.row, boardRowColumn.column) });
  }

  setCheesBoxesStatus(board: CheesBox[][], row: number, column: number): void {
    const _row = this.color === IPawnTeam.black ? row + 1 : row - 1;
    const _doubleRow = this.color === IPawnTeam.black ? row + 2 : row - 2;
    if(this.color === IPawnTeam.black) {
      if(_row <= 7 && _row >= 0) {
        board[_row][column].isMoveable = board[_row][column].pawnChees === null;
        if(column + 1 <= 7 && column - 1 >= 0) {
          board[_row][column + 1].isEatable = this.isOppositeColor(board[_row][column + 1], this.color);
          board[_row][column - 1].isEatable = this.isOppositeColor(board[_row][column - 1], this.color);
        }
      }
      if((Cheesboard.isFirstMoveBlack &&  _doubleRow <= 7) || Cheesboard.isFirstMoveWhite && row - 2 >= 0) {
        board[_doubleRow][column].isMoveable = board[_doubleRow][column].pawnChees === null;
      }
    }
  }

  setCheesBoxesCanEat(board: CheesBox[][], row: number, column: number): void {
    const _row = this.color === IPawnTeam.black ? row + 1 : row - 1;
    if(_row <= 7 && _row >= 0) {
      if(column + 1 <= 7 && column - 1 >= 0) {
        board[_row][column + 1].canBeEatable = this.isOppositeColor(board[_row][column + 1], this.color);
        board[_row][column - 1].canBeEatable = this.isOppositeColor(board[_row][column - 1], this.color);
      }
    }
  }
}
