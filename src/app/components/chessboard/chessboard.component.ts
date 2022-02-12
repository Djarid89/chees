import { Component, OnInit} from '@angular/core';
import { CheesBox } from '../chees-box/class/chees-box';
import { IPawnChees } from '../pawn-chees/interface/pawn-chees';
import { Cheesboard } from './class/cheesBoard';

@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit {
  cheesboard!: Cheesboard;
  number = ['8','7','6','5','4','3','2','1'];
  letter = ['A','B','C','D','E','F','G','H'];
  isFirstMove = true;


  ngOnInit(): void {
    this.cheesboard = new Cheesboard();
    this.cheesboard.initBlackTeam();
    this.cheesboard.initWhiteTeam();
  }

  showAvaibleMovement(pawnChees: IPawnChees, row: number, column: number) {
    if(pawnChees) {
      pawnChees.setCheesBoxMovable(this.cheesboard?.board, row, column, this.isFirstMove);
    }
  }

  movePawnChees(cheesBox: CheesBox) {

  }

  dropPawnChees(): void {
    this.cheesboard.removeAllMovable();
  }
}
