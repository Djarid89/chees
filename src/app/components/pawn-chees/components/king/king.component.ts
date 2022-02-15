import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../../../service/connector.service';
import { IBoardColor } from '../../../../shared/interface/shared';
import { CheesBox } from '../../../chees-box/class/chees-box';
import { BasePawnChees } from '../../class/base-pawn-chees';
import { IPawnChees, IPawnCheesType, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_CHEES } from '../pawn-chees.token';

@Component({
  selector: 'king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.scss'],
  providers: [
    {
      provide: PAWN_CHEES,
      useExisting: KingComponent
    }
  ]
})
export class KingComponent extends BasePawnChees implements OnInit, OnDestroy, IPawnChees {
  @Input() row!: number;
  @Input() column!: number;
  @Input() type!: IPawnCheesType;
  @Input() color!: IPawnTeam;
  updateAllCanEatSubs!: Subscription;
  isKingCapturedSubs!: Subscription;

  constructor(private readonly connector: ConnectorService) {
    super();
  }

  ngOnDestroy(): void {
    this.updateAllCanEatSubs.unsubscribe();
    this.isKingCapturedSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.updateAllCanEatSubs = this.connector.updateAllCanEat$.subscribe({
      next: (boardColor: IBoardColor) => {
        if(boardColor.color === this.color) {
          this.setCheesBoxesCanEat(boardColor.board);
          this.connector.isKingUnderCheck$.next(this.color);
        }
      }
    })
    this.isKingCapturedSubs = this.connector.isKingCaptured$.subscribe({
      next: (board: CheesBox[][]) => {
        if(this.isCaptured(board)) {
          this.connector.isGameWinning$.next(this.color);
        }
      }
    });
  }

  private isCaptured(board: CheesBox[][]): boolean {
    let isBlocked = true;
    if(this.row + 1 <= 7 && this.column + 1 <= 7) {
      isBlocked = isBlocked && board[this.row + 1][this.column + 1].canBeEatable;
    }
    if(this.column + 1 <= 7) {
      isBlocked = isBlocked && board[this.row][this.column + 1].canBeEatable;
    }
    if(this.row - 1 >= 0 && this.column + 1 <= 7) {
      isBlocked = isBlocked && board[this.row - 1][this.column + 1].canBeEatable;
    }
    if(this.row - 1 >= 0) {
      isBlocked = isBlocked && board[this.row - 1][this.column].canBeEatable;
    }
    if(this.row - 1 >= 0 && this.column - 1 >= 0) {
      isBlocked = isBlocked && board[this.row - 1][this.column - 1].canBeEatable;
    }
    if(this.column - 1 >= 0) {
      isBlocked = isBlocked && board[this.row][this.column - 1].canBeEatable;
    }
    if(this.row + 1 <= 7 &&  this.column - 1 >= 0) {
      isBlocked = isBlocked && board[this.row + 1][this.column - 1].canBeEatable;
    }
    if(this.row + 1 <= 7) {
      isBlocked = isBlocked && board[this.row + 1][this.column].canBeEatable;
    }
    return isBlocked;
  }

  setCheesBoxesStatus(board: CheesBox[][], row: number, column: number, canBeEatable = false) {
    if(row + 1 <= 7 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row + 1][column + 1], this.color, canBeEatable, true);
    }
    if(column + 1 <= 7) {
      this.setCheesBoxStatus(board[row][column + 1], this.color, canBeEatable, true);
    }
    if(row - 1 >= 0 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row - 1][column + 1], this.color, canBeEatable, true);
    }
    if(row - 1 >= 0) {
      this.setCheesBoxStatus(board[row - 1][column], this.color, canBeEatable, true);
    }
    if(row - 1 >= 0 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row - 1][column - 1], this.color, canBeEatable, true);
    }
    if(column - 1 >= 0) {
      this.setCheesBoxStatus(board[row][column - 1], this.color, canBeEatable, true);
    }
    if(row + 1 <= 7 &&  column - 1 >= 0) {
      this.setCheesBoxStatus(board[row + 1][column - 1], this.color, canBeEatable, true);
    }
    if(row + 1 <= 7) {
      this.setCheesBoxStatus(board[row + 1][column], this.color, canBeEatable, true);
    }
  }

  setCheesBoxesCanEat(board: CheesBox[][]) {
    this.setCheesBoxesStatus(board, this.row, this.column, true)
  }
}
