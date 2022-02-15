import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CheesBox } from 'src/app/components/chees-box/class/chees-box';
import { IBoardColor } from 'src/app/shared/interface/shared';
import { ConnectorService } from '../../../../service/connector.service';
import { BasePawnChees } from '../../class/base-pawn-chees';
import { IPawnChees, IPawnCheesType, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_CHEES } from '../pawn-chees.token';

@Component({
  selector: 'bishop',
  templateUrl: './bishop.component.html',
  styleUrls: ['./bishop.component.scss'],
  providers: [
    {
      provide: PAWN_CHEES,
      useExisting: BishopComponent
    }
  ]
})
export class BishopComponent extends BasePawnChees implements OnInit, OnDestroy, IPawnChees {
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

  setCheesBoxesStatus(board: CheesBox[][], row: number, column: number, canBeEatable = false) {
    let _row = row + 1;
    let _column = column + 1;
    while(_row <= 7 && _column <= 7) {
      this.setCheesBoxStatus(board[_row][_column], this.color, canBeEatable);
      if(board[_row][_column].pawnChees !== null) {
        break;
      } else {
        _row++;
        _column++;
      }
    }
    _row = row - 1;
    _column = column + 1;
    while(_row >= 0 && _column <= 7) {
      this.setCheesBoxStatus(board[_row][_column], this.color, canBeEatable);
      if(board[_row][_column].pawnChees !== null) {
        break;
      } else {
        _row--;
        _column++;
      }
    }
    _row = row - 1;
    _column = column - 1;
    while(_row >= 0 && _column >= 0) {
      this.setCheesBoxStatus(board[_row][_column], this.color, canBeEatable);
      if(board[_row][_column].pawnChees !== null) {
        break;
      } else {
        _row--;
        _column--;
      }
    }
    _row = row + 1;
    _column = column - 1;
    while(_row <= 7 && _column >= 0) {
      this.setCheesBoxStatus(board[_row][_column], this.color, canBeEatable);
      if(board[_row][_column].pawnChees !== null) {
        break;
      } else {
        _row++;
        _column--;
      }
    }
  }

  setCheesBoxesCanEat(board: CheesBox[][]) {
    this.setCheesBoxesStatus(board, this.row, this.column, true)
  }
}
