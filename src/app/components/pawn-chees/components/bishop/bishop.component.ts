import { Component, Input } from '@angular/core';
import { CheesBox } from 'src/app/components/chees-box/class/chees-box';
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
export class BishopComponent implements IPawnChees {
  @Input() type!: IPawnCheesType;
  @Input() color!: IPawnTeam;
  IPawnTeam = IPawnTeam;

  setCheesBoxMovable(board: CheesBox[][], row: number, column: number) {
    // do {
    //   row++;
    //   column++;
    // } while(row <= 7 && column <= 7) {
    //   this.setMovable(board[row][column]);
    //   if(!board[row][column].isMoveable) {
    //     return;
    //   }
    // }
    // do {
    //   row--;
    //   column++;
    // } while(row >= 0 && column <= 7) {
    //   this.setMovable(board[row][column]);
    //   if(!board[row][column].isMoveable) {
    //     return;
    //   }
    // }
    // do {
    //   row--;
    //   column--;
    // } while(row >= 0 && column >= 0) {
    //   this.setMovable(board[row][column]);
    //   if(!board[row][column].isMoveable) {
    //     return;
    //   }
    // }
    // do {
    //   row++;
    //   column--;
    // } while(row <= 7 && column >= 0) {
    //   this.setMovable(board[row][column]);
    //   if(!board[row][column].isMoveable) {
    //     return;
    //   }
    // }
  }

  private setMovable(cheesBox: CheesBox): void {
    cheesBox.isMoveable = cheesBox.pawnChees === null;
  }
}
