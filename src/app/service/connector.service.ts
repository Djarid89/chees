import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CheesBox } from '../components/chees-box/class/chees-box';
import { IPawnTeam } from '../components/pawn-chees/interface/pawn-chees';
import { IBoardColor, IFromToCheesBox } from '../shared/interface/shared';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  moveUp$ = new Subject<CheesBox>();
  removeAllMovable$ = new Subject<void>();
  updateAllCanEat$ = new Subject<IBoardColor>();
  isKingUnderCheck$ = new Subject<IBoardColor>();
  isKingCaptured$ = new Subject<CheesBox[][]>();
  isGameWinning$ = new Subject<IPawnTeam>();
  movePawnChees$ = new Subject<IFromToCheesBox>();
}
