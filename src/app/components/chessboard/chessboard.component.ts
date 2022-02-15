import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { ConnectorService } from '../../service/connector.service';
import { IPawnChees, IPawnTeam } from '../pawn-chees/interface/pawn-chees';
import { Cheesboard } from './class/cheesBoard';

@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit, OnDestroy {
  cheesboard!: Cheesboard;
  number = ['8','7','6','5','4','3','2','1'];
  letter = ['A','B','C','D','E','F','G','H'];
  currentTeam = IPawnTeam.white;
  initSubscription!: Subscription;
  winningTeam!: IPawnTeam;
  removeAllMovableSubs!: Subscription;
  isGameWinningSubs!: Subscription;
  passTurnSubs!: Subscription;

  constructor(private readonly connector: ConnectorService) { }

  ngOnDestroy(): void {
    this.removeAllMovableSubs.unsubscribe();
    this.isGameWinningSubs.unsubscribe();
    this.passTurnSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cheesboard = new Cheesboard();
    this.cheesboard.initBlackTeam();
    this.cheesboard.initWhiteTeam();
    this.removeAllMovableSubs = this.connector.removeAllMovable$.subscribe({ next: () => this.cheesboard.removeStatus() });
    this.isGameWinningSubs = this.connector.isGameWinning$.subscribe({ next: (pawnTeam: IPawnTeam) => this.winningTeam = pawnTeam });
    this.passTurnSubs = this.connector.passTurn$.subscribe({
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
