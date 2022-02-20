import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from 'src/app/service/connector.service';
import { PawnChees } from '../chees-box/class/chees-box';
import { IPawnCheesType } from '../pawn-chees/interface/pawn-chees';

@Component({
  selector: 'graveyard',
  templateUrl: './graveyard.component.html',
  styleUrls: ['./graveyard.component.scss']
})
export class GraveyardComponent implements OnInit {
  @Input() pawnCheeses!: PawnChees[] | undefined;
  @Output() close = new EventEmitter();
  IPawnCheesType = IPawnCheesType;
  resurrectionSub!: Subscription;

  constructor(private readonly connector: ConnectorService) { }

  ngOnInit(): void {
    const paw = this.pawnCheeses;
  }

  resurrection(pawnChees: PawnChees): void {
    this.connector.doResurrect$.next(pawnChees.type);
    this.close.emit();
  }
}
