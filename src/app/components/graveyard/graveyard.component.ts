import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from 'src/app/service/connector.service';
import { PawnChees } from '../chees-box/class/chees-box';
import { IPawnChees, IPawnCheesType } from '../pawn-chees/interface/pawn-chees';

@Component({
  selector: 'graveyard',
  templateUrl: './graveyard.component.html',
  styleUrls: ['./graveyard.component.scss']
})
export class GraveyardComponent implements OnInit {
  @Input() graveyard!: PawnChees[];
  IPawnCheesType = IPawnCheesType;
  resurrectionSub!: Subscription;

  constructor(private readonly connector: ConnectorService) { }

  ngOnInit(): void {
    this.resurrectionSub = this.connector.resurrect$.subscribe({
      next: (graveyard: PawnChees[]) => {
        this.graveyard = graveyard.map((pawnchees: PawnChees) => new PawnChees(pawnchees.type, pawnchees.color, pawnchees.doubleMove));
      }
    });
  }

  resurrection(pawnChees: PawnChees): void {
    this.connector.doResurrect$.next(pawnChees.type);
  }
}
