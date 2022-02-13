import { Component, OnInit} from '@angular/core';
import { ConnectorService } from 'src/app/service/connector.service';
import { CheesBox } from '../chees-box/class/chees-box';
import { IPawnChees, IPawnTeam } from '../pawn-chees/interface/pawn-chees';
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
  currentTeam = IPawnTeam.white;

  constructor(private readonly connector: ConnectorService) { }

  ngOnInit(): void {
    this.cheesboard = new Cheesboard();
    this.cheesboard.initBlackTeam();
    this.cheesboard.initWhiteTeam();
    this.connector.removeAllMovable$.subscribe({ next: () => this.cheesboard.removeStatus() });
    this.connector.passTurn$.subscribe({ next: (pawnTeam: IPawnTeam) => this.currentTeam = pawnTeam === IPawnTeam.black ? IPawnTeam.white : IPawnTeam.black });
    this.connector.checkWinningCondition$.subscribe({ next: () => this.cheesboard.checkWinningCondition(this.currentTeam) })
  }

  showAvaibleMovement(pawnChees: IPawnChees, row: number, column: number) {
    if(pawnChees && this.currentTeam === pawnChees.color) {
      pawnChees.setCheesBoxesMovable(this.cheesboard?.board, row, column);
    }
  }
}
