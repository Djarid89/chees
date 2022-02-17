import { Component, Input } from '@angular/core';
import { IPawnCheesType } from '../pawn-chees/interface/pawn-chees';
import { CheesBox } from './class/chees-box';

@Component({
  selector: 'chees-box',
  templateUrl: './chees-box.component.html',
  styleUrls: ['./chees-box.component.scss']
})
export class CheesBoxComponent {
  @Input() cheesBox!: CheesBox;
  IPawnCheesType = IPawnCheesType;
}
