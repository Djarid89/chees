import { AfterViewInit, Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { BishopComponent } from '../pawn-chees/components/bishop/bishop.component';
import { KingComponent } from '../pawn-chees/components/king/king.component';
import { KnightComponent } from '../pawn-chees/components/knight/knight.component';
import { PawnComponent } from '../pawn-chees/components/pawn/pawn.component';
import { QueenComponent } from '../pawn-chees/components/queen/queen.component';
import { RookComponent } from '../pawn-chees/components/rook/rook.component';
import { IPawnCheesType } from '../pawn-chees/interface/pawn-chees';

@Component({
  selector: 'chees-box',
  templateUrl: './chees-box.component.html',
  styleUrls: ['./chees-box.component.scss']
})
export class CheesBoxComponent implements AfterViewInit {
  @Input() row!: number;
  @Input() column!: number;
  @Input() pawn: IPawnCheesType | undefined;
  @ViewChild('pawnChees', { read: ViewContainerRef }) pawnChees!: ViewContainerRef;

  constructor(private readonly cfr: ComponentFactoryResolver) { }

  ngAfterViewInit(): void {
    if(this.pawn === IPawnCheesType.pawn) {
      this.pawnChees.createComponent<PawnComponent>(this.cfr.resolveComponentFactory(PawnComponent));
    } else if(this.pawn === IPawnCheesType.bishop) {
      this.pawnChees.createComponent<BishopComponent>(this.cfr.resolveComponentFactory(BishopComponent));
    } else if(this.pawn === IPawnCheesType.king) {
      this.pawnChees.createComponent<KingComponent>(this.cfr.resolveComponentFactory(KingComponent));
    } else if(this.pawn === IPawnCheesType.knight) {
      this.pawnChees.createComponent<KnightComponent>(this.cfr.resolveComponentFactory(KnightComponent));
    } else if(this.pawn === IPawnCheesType.queen) {
      this.pawnChees.createComponent<QueenComponent>(this.cfr.resolveComponentFactory(QueenComponent));
    } else if(this.pawn === IPawnCheesType.rook) {
      this.pawnChees.createComponent<RookComponent>(this.cfr.resolveComponentFactory(RookComponent));
    }
  }

  isPair(): boolean {
    return (this.row + this.column) % 2 !== 0;
  }
}
