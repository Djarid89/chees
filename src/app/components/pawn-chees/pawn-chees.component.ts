import { Component, ContentChild, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { PAWN_EXTENDED } from './components/pawn-chees.token';
import { IPawnCheesBase, IPawnCheesExtended, IPawnCheesType, IPawnTeam } from './interface/pawn-chees';

@Component({
  selector: 'pawn-chees',
  templateUrl: './pawn-chees.component.html',
  styleUrls: ['./pawn-chees.component.scss']
})
export class PawnCheesComponent implements IPawnCheesBase {
  pawnCheesType!: IPawnCheesType;
  color: IPawnTeam | undefined;
  @Input() pawnchees!: IPawnCheesBase;
  @Output() mouseDown = new EventEmitter<IPawnCheesExtended>();
  @Output() dragEnd = new EventEmitter<IPawnCheesExtended>();
  @ContentChild(PAWN_EXTENDED) pawnBase!: IPawnCheesExtended;
  @HostListener('mousedown') mouseDownEvent() { this.grab() }
  // @HostListener('dragend') dragEndEvent() { this.drop() }

  move(): void {
  }

  grab(): void {
    this.mouseDown.emit({
      color: this.pawnchees.color,
      showAvaibleMove: this.pawnBase.showAvaibleMove
    });
  }

  // drop(): void {
  //   this.dragEnd.emit(this.pawnchees);
  // }

  // eat(): void {
  //   this.pawnBase.eat();
  // }
}
