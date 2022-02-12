import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CheesBoxPawnCheesConnectorService } from 'src/app/service/chees-box-pawn-chees-connector.service';
import { IPawnChees, IPawnCheesType } from '../pawn-chees/interface/pawn-chees';
import { CheesBox } from './class/chees-box';

@Component({
  selector: 'chees-box',
  templateUrl: './chees-box.component.html',
  styleUrls: ['./chees-box.component.scss']
})
export class CheesBoxComponent {
  @Input() cheesBox!: CheesBox;
  @Output() mouseDown = new EventEmitter<IPawnChees>();
  @Output() mouseUp = new EventEmitter<CheesBox>();
  @Output() drop = new EventEmitter<IPawnChees>();
  @HostListener('mouseup') mouseUpEvent() { this.pawnCheesDropped(); }
  IPawnCheesType = IPawnCheesType;

  constructor(private readonly connector: CheesBoxPawnCheesConnectorService) { }

  pawnCheesDropped(): void {
    this.connector.pawnCheeseAdder$.next(this.cheesBox);
    this.mouseUp.emit(this.cheesBox)
  }

  propagateMouseDown(pawnChees: IPawnChees) {
    this.mouseDown.emit(pawnChees);
  }

  propagateDropEnd() {
    this.drop.emit();
  }
}
