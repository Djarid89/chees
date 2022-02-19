import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CheesBox } from '../components/chees-box/class/chees-box';
import { IPawnChees } from '../components/pawn-chees/interface/pawn-chees';
import { asd, IBoardColor, ICheesBoardColor, IFromToCheesBox, IModalContent } from '../shared/interface/shared';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  moveUp$ = new Subject<CheesBox>();
  removeAllMovable$ = new Subject<void>();
  updateAllCanBeEatable$ = new Subject<IBoardColor>();
  movePawnChees$ = new Subject<IFromToCheesBox>();
  tryDefendKing$ = new Subject<ICheesBoardColor>();
  kingIsBlock$ = new Subject<void>();
  gameIsOver$ = new Subject<void>();
  showAvaibleMovement$ = new Subject<IPawnChees>();
  isMyKingSafe$ = new Subject<void>();
  isOppositeKingCaptured$ = new Subject<void>();
  isAllCanEatabled$ = new Subject<void>();
  showModal$ = new BehaviorSubject<IModalContent>({});
}
