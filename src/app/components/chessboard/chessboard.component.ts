import { Component, OnInit} from '@angular/core';
import { IPawnCheesExtended } from '../pawn-chees/interface/pawn-chees';
import { Cheesboard } from './class/cheesBoard';

@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit {
  cheesboard: Cheesboard | undefined;

  ngOnInit(): void {
    this.cheesboard = new Cheesboard();
    this.cheesboard.initBlackTeam();
    this.cheesboard.initWhiteTeam();
  }

  showAvaibleMovement(pawnchees: IPawnCheesExtended, row: number, column: number) {
    pawnchees.showAvaibleMove(row, column);
  }
}
