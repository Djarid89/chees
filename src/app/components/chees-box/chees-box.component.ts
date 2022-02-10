import { Component, Input, OnInit } from '@angular/core';
import { Coordinate } from '../../shared/class/shared';
import { IIndexValue } from '../../shared/interface/shared';

@Component({
  selector: 'chees-box',
  templateUrl: './chees-box.component.html',
  styleUrls: ['./chees-box.component.scss']
})
export class CheesBoxComponent implements OnInit {
  @Input() horizzontal: IIndexValue | undefined;
  @Input() vertical: IIndexValue | undefined;
  coordinate: Coordinate | undefined;

  ngOnInit(): void {
    this.coordinate = new Coordinate(this.horizzontal, this.vertical);
  }

}
