import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../service/connector.service';
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
  initSubscription!: Subscription;
  winningTeam!: IPawnTeam;

  constructor(private readonly connector: ConnectorService) { }

  ngOnInit(): void {
    this.cheesboard = new Cheesboard();
    this.cheesboard.initBlackTeam();
    this.cheesboard.initWhiteTeam();
    this.connector.removeAllMovable$.subscribe({ next: () => this.cheesboard.removeStatus() });
    this.connector.isGameWinning$.subscribe({ next: (pawnTeam: IPawnTeam) => this.winningTeam = pawnTeam });
    this.connector.passTurn$.subscribe({
      next: (pawnTeam: IPawnTeam) => {
        this.cheesboard.resetCheesBoxCanEat();
        setTimeout(() => {
          const oppositeColor = pawnTeam === IPawnTeam.black ? IPawnTeam.white : IPawnTeam.black;
          this.connector.updateAllCanEat$.next({ board: this.cheesboard.board, color: pawnTeam });
          if(this.cheesboard.isKingUnderCheck(oppositeColor)) {
            this.connector.isKingCaptured$.next(this.cheesboard.board);
          } else {
            this.currentTeam = oppositeColor;
          }
        })
      } });
  }

  showAvaibleMovement(pawnChees: IPawnChees): void {
    if(pawnChees && this.currentTeam === pawnChees.color) {
      pawnChees.setCheesBoxesStatus(this.cheesboard?.board, pawnChees.row, pawnChees.column);
    }
  }
}
