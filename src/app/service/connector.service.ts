import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CheesBox } from '../components/chees-box/class/chees-box';
import { IPawnTeam } from '../components/pawn-chees/interface/pawn-chees';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  movePawnChees$ = new Subject<CheesBox>();
  removeAllMovable$ = new Subject<void>();
  passTurn$ = new Subject<IPawnTeam>();
  updateAllCanEat$ = new Subject<CheesBox[][]>();
}
