import { Component, ContentChild, EventEmitter, HostListener, Output } from '@angular/core';
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

  grab(): void {
    if(this.pawnBase) {
      this.mouseDown.emit(this.pawnBase);
    }
  }

  release(): void {
    this.drop.emit();
  }
}
