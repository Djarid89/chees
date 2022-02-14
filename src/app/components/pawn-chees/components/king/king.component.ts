import { Component, Input } from '@angular/core';
import { CheesBox } from 'src/app/components/chees-box/class/chees-box';
import { ConnectorService } from '../../../../service/connector.service';
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
export class KingComponent extends BasePawnChees implements IPawnChees {
  @Input() row!: number;
  @Input() column!: number;
  @Input() type!: IPawnCheesType;
  @Input() color!: IPawnTeam;

  constructor(private readonly connector: ConnectorService) {
    super();
  }

  ngOnInit(): void {
    this.connector.updateAllCanEat$.subscribe({
      next: (board: CheesBox[][]) => {
        this.setCheesBoxesCanEat(board);
      }
    })
    if(this.color === IPawnTeam.white) {
      this.connector.isCapturedWhite$.subscribe({
        next: (board: CheesBox[][]) => this.isCaptured(board)
      });
    } else {
      this.connector.isCapturedBlack$.subscribe({
        next: (board: CheesBox[][]) => this.isCaptured(board)
      });
    }
  }

  private isCaptured(board: CheesBox[][]) {
    if(!board[this.row][this.column].isEatable) {
      return false;
    }

    let isBlocked = true;
    if(this.row + 1 <= 7 && this.column + 1 <= 7) {
      isBlocked = isBlocked && board[this.row + 1][this.column + 1].isEatable;
    }
    if(this.column + 1 <= 7) {
      isBlocked = isBlocked && board[this.row][this.column + 1].isEatable;
    }
    if(this.row - 1 >= 0 && this.column + 1 <= 7) {
      isBlocked = isBlocked && board[this.row - 1][this.column + 1].isEatable;
    }
    if(this.row - 1 >= 0) {
      isBlocked = isBlocked && board[this.row - 1][this.column].isEatable;
    }
    if(this.row - 1 >= 0 && this.column - 1 >= 0) {
      isBlocked = isBlocked && board[this.row - 1][this.column - 1].isEatable;
    }
    if(this.column - 1 >= 0) {
      isBlocked = isBlocked && board[this.row][this.column - 1].isEatable;
    }
    if(this.row + 1 <= 7 &&  this.column - 1 >= 0) {
      isBlocked = isBlocked && board[this.row + 1][this.column - 1].isEatable;
    }
    if(this.row + 1 <= 7) {
      isBlocked = isBlocked && board[this.row + 1][this.column].isEatable;
    }
    return isBlocked;
  }

  setCheesBoxesStatus(board: CheesBox[][], row: number, column: number, canBeEatable = false) {
    if(row + 1 <= 7 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row + 1][column + 1], this.color, canBeEatable);
    }
    if(column + 1 <= 7) {
      this.setCheesBoxStatus(board[row][column + 1], this.color, canBeEatable);
    }
    if(row - 1 >= 0 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row - 1][column + 1], this.color, canBeEatable);
    }
    if(row - 1 >= 0) {
      this.setCheesBoxStatus(board[row - 1][column], this.color, canBeEatable);
    }
    if(row - 1 >= 0 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row - 1][column - 1], this.color, canBeEatable);
    }
    if(column - 1 >= 0) {
      this.setCheesBoxStatus(board[row][column - 1], this.color, canBeEatable);
    }
    if(row + 1 <= 7 &&  column - 1 >= 0) {
      this.setCheesBoxStatus(board[row + 1][column - 1], this.color, canBeEatable);
    }
    if(row + 1 <= 7) {
      this.setCheesBoxStatus(board[row + 1][column], this.color, canBeEatable);
    }
  }

  setCheesBoxesCanEat(board: CheesBox[][]) {
    this.setCheesBoxesStatus(board, this.row, this.column, true)
  }
}
