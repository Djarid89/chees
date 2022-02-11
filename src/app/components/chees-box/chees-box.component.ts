import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPawnCheesBase, IPawnCheesExtended, IPawnCheesType } from '../pawn-chees/interface/pawn-chees';

@Component({
  selector: 'chees-box',
  templateUrl: './chees-box.component.html',
  styleUrls: ['./chees-box.component.scss']
})
export class CheesBoxComponent {
  @Input() row!: number;
  @Input() column!: number;
  @Input() pawnchees!: IPawnCheesBase;
  @Output() mouseDown = new EventEmitter<IPawnCheesExtended>();
  IPawnCheesType = IPawnCheesType;

  isPair(): boolean {
    return (this.row + this.column) % 2 !== 0;
  }

  propagate(pawnchees: IPawnCheesExtended) {
    this.mouseDown.emit(pawnchees);
  }
}
