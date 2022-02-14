import { Component, ContentChild, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from 'src/app/service/connector.service';
import { CheesBox } from '../chees-box/class/chees-box';
import { Cheesboard } from '../chessboard/class/cheesBoard';
import { PAWN_CHEES } from './components/pawn-chees.token';
import { IPawnChees, IPawnCheesType } from './interface/pawn-chees';

@Component({
  selector: 'pawn-chees',
  templateUrl: './pawn-chees.component.html',
  styleUrls: ['./pawn-chees.component.scss']
})
export class PawnCheesComponent {
  @Input() cheesBox!: CheesBox;
  @Output() showAvaibleMovement = new EventEmitter<IPawnChees>();
  @Output() setCheesBoxesCanEat = new EventEmitter<IPawnChees>();
  @Output() unSetCheesBoxesCanEat = new EventEmitter<IPawnChees>();
  @ContentChild(PAWN_CHEES) pawnBase!: IPawnChees;
  @HostListener('mousedown') mouseDownEvent() { this.mouseDown() }
  @HostListener('mouseup') mouseup() { this.release() }
  @HostListener('dragend') dropEvent() { this.release() }
  moveCheesSubscription!: Subscription;

  constructor(private readonly connector: ConnectorService) { }

  mouseDown(): void {
    if(this.pawnBase) {
      this.unSetCheesBoxesCanEat.emit(this.pawnBase); // TODO
      this.moveCheesSubscription = this.connector.movePawnChees$.subscribe({
        next: (toCheesBox: CheesBox) => {
          if(this.cheesBox !== toCheesBox || !toCheesBox) {
            return;
          }

          if(toCheesBox.isMoveable) {
            Cheesboard.movePawnChees(this.cheesBox, toCheesBox);
            this.passTurnAndUpdatePotential();
          } else if(toCheesBox.isEatable && toCheesBox.pawnChees?.type !== IPawnCheesType.king) {
            Cheesboard.eatPawnChees(this.cheesBox, toCheesBox);
            this.passTurnAndUpdatePotential();
          }

          this.moveCheesSubscription.unsubscribe();
        }
      });
      this.showAvaibleMovement.emit(this.pawnBase);
    }
  }

  private passTurnAndUpdatePotential(): void {
    this.connector.passTurn$.next(this.pawnBase.color);
    this.setCheesBoxesCanEat.emit(this.pawnBase);
  }

  release(): void {
    this.connector.movePawnChees$.next(this.cheesBox);
    this.connector.removeAllMovable$.next();
  }
}
