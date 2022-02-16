import { Component, ContentChild, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../service/connector.service';
import { Action } from '../../shared/interface/shared';
import { CheesBox } from '../chees-box/class/chees-box';
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
  @ContentChild(PAWN_CHEES) pawnBase!: IPawnChees;
  @HostListener('mousedown') mouseDownEvent() { this.mouseDown() }
  @HostListener('mouseup') mouseup() { this.release() }
  @HostListener('dragend') dropEvent() { this.release() }
  moveUpSubs!: Subscription;

  constructor(private readonly connector: ConnectorService) { }

  mouseDown(): void {
    if(this.pawnBase) {
      this.showAvaibleMovement.emit(this.pawnBase);

      this.moveUpSubs = this.connector.moveUp$.subscribe({
        next: (toCheesBox: CheesBox) => {
          const fromCheesBox = this.cheesBox;
          if(fromCheesBox !== toCheesBox) {
            if(toCheesBox?.isMoveable) {
              this.connector.movePawnChees$.next({ fromCheesBox: fromCheesBox, toCheesBox: toCheesBox, action: Action.move });
            } else if(toCheesBox?.isEatable && toCheesBox?.pawnChees?.type !== IPawnCheesType.king) {
              this.connector.movePawnChees$.next({ fromCheesBox: fromCheesBox, toCheesBox: toCheesBox, action: Action.eat });
            }
          }
          this.moveUpSubs.unsubscribe();
        }
      });
    }
  }

  release(): void {
    this.connector.moveUp$.next(this.cheesBox);
    this.connector.removeAllMovable$.next();
  }
}
