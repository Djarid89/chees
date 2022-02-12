import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CheesBox, PawnChees } from '../components/chees-box/class/chees-box';

@Injectable({
  providedIn: 'root'
})
export class CheesBoxPawnCheesConnectorService {
  pawnCheeseAdder$ = new Subject<CheesBox>();

  constructor() { }
}
