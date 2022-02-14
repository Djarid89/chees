import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CheesBox } from '../components/chees-box/class/chees-box';
import { IPawnTeam } from '../components/pawn-chees/interface/pawn-chees';
import { IBoardRowColumn } from '../shared/interface/shared';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  movePawnChees$ = new Subject<CheesBox>();
  removeAllMovable$ = new Subject<void>();
  passTurn$ = new Subject<IPawnTeam>();
}
