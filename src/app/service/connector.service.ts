import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CheesBox } from '../components/chees-box/class/chees-box';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  movePawnChees$ = new Subject<CheesBox>();
  removeAllMovable$ = new Subject<void>();

  constructor() { }
}
