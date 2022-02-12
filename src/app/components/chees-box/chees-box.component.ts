import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ConnectorService } from 'src/app/service/connector.service';
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
  @Output() drop = new EventEmitter<IPawnChees>();
  @HostListener('mouseup') mouseUpEvent() { this.pawnCheesDropped(); }
  IPawnCheesType = IPawnCheesType;

  constructor(private readonly connector: ConnectorService) { }

  pawnCheesDropped(): void {
    this.connector.pawnCheeseAdder$.next(this.cheesBox);
    this.connector.pawnCheeseDeleter$.next();
    if(this.connector.isFirstMove) {
      this.connector.isFirstMove = false;
    }
  }

  propagateMouseDown(pawnChees: IPawnChees) {
    this.connector.pawnCheeseDeleter$.subscribe({ next: () => this.cheesBox.pawnChees = null });
    this.mouseDown.emit(pawnChees);
  }

  propagateDropEnd() {
    this.drop.emit();
  }
}
