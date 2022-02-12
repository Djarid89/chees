import { Component, ContentChild, EventEmitter, HostListener, Output } from '@angular/core';
import { ConnectorService } from 'src/app/service/connector.service';
import { CheesBox, PawnChees } from '../chees-box/class/chees-box';
import { PAWN_CHEES } from './components/pawn-chees.token';
import { IPawnChees } from './interface/pawn-chees';

@Component({
  selector: 'pawn-chees',
  templateUrl: './pawn-chees.component.html',
  styleUrls: ['./pawn-chees.component.scss']
})
export class PawnCheesComponent {
  @Output() mouseDown = new EventEmitter<IPawnChees>();
  @Output() drop = new EventEmitter();
  @ContentChild(PAWN_CHEES) pawnBase!: IPawnChees;
  @HostListener('mousedown') mouseDownEvent() { this.grab() }
  @HostListener('mouseup') mouseup() { this.release() }
  @HostListener('dragend') dropEvent() { this.release() }

  constructor(private readonly connector: ConnectorService) { }

  grab(): void {
    if(this.pawnBase) {
      this.connector.pawnCheeseAdder$.subscribe({ next: (cheesBox: CheesBox) => this.setPawnCheesType(cheesBox) }); // bisogna completare sta roba
      this.mouseDown.emit(this.pawnBase);
    }
  }

  private setPawnCheesType(cheesBox: CheesBox): void {
    if(this.pawnBase) {
      cheesBox.pawnChees = new PawnChees(this.pawnBase.pawnChees.type, this.pawnBase.pawnChees.color);
    }
  }

  release(): void {
    this.drop.emit();
  }
}
