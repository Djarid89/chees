import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from 'src/app/service/connector.service';
import { PawnChees } from '../chees-box/class/chees-box';
import { IPawnChees, IPawnCheesType } from '../pawn-chees/interface/pawn-chees';

@Component({
  selector: 'graveyard',
  templateUrl: './graveyard.component.html',
  styleUrls: ['./graveyard.component.scss']
})
export class GraveyardComponent {
  @Input() graveyard!: PawnChees[];
  IPawnCheesType = IPawnCheesType;
  resurrectionSub!: Subscription;

  constructor(private readonly connector: ConnectorService) { }

  resurrection(pawnChees: PawnChees): void {
    this.connector.doResurrect$.next(pawnChees.type);
  }
}
