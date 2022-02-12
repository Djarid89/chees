import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CheesBox } from '../components/chees-box/class/chees-box';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  pawnCheeseAdder$ = new Subject<CheesBox>();
  pawnCheeseDeleter$ = new Subject<CheesBox>();
  isFirstMove = true;

  constructor() { }
}
