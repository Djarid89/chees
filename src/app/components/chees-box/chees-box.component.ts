import { AfterViewInit, Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { BishopComponent } from '../pawn-chees/components/bishop/bishop.component';
import { KingComponent } from '../pawn-chees/components/king/king.component';
import { KnightComponent } from '../pawn-chees/components/knight/knight.component';
import { PawnComponent } from '../pawn-chees/components/pawn/pawn.component';
import { QueenComponent } from '../pawn-chees/components/queen/queen.component';
import { RookComponent } from '../pawn-chees/components/rook/rook.component';
import { IPawnChees, IPawnCheesType } from '../pawn-chees/interface/pawn-chees';

@Component({
  selector: 'chees-box',
  templateUrl: './chees-box.component.html',
  styleUrls: ['./chees-box.component.scss']
})
export class CheesBoxComponent implements AfterViewInit {
  @Input() row!: number;
  @Input() column!: number;
  @Input() pawnchees!: IPawnChees;
  @ViewChild('pawnChees', { read: ViewContainerRef }) pawnCheesView!: ViewContainerRef;

  constructor(private readonly cfr: ComponentFactoryResolver) { }

  ngAfterViewInit(): void {
    setTimeout(() => {  // Soluzione altamente IGNORANTE al problema di "ExpressionChangedAfterItHasBeenCheckedError"
      let componentRef = null;
      if(this.pawnchees.pawnCheesType === IPawnCheesType.pawn) {
        componentRef = this.pawnCheesView.createComponent<PawnComponent>(this.cfr.resolveComponentFactory(PawnComponent));
      } else if(this.pawnchees.pawnCheesType === IPawnCheesType.bishop) {
        componentRef =this.pawnCheesView.createComponent<BishopComponent>(this.cfr.resolveComponentFactory(BishopComponent));
      } else if(this.pawnchees.pawnCheesType === IPawnCheesType.king) {
        componentRef =this.pawnCheesView.createComponent<KingComponent>(this.cfr.resolveComponentFactory(KingComponent));
      } else if(this.pawnchees.pawnCheesType === IPawnCheesType.knight) {
        componentRef =this.pawnCheesView.createComponent<KnightComponent>(this.cfr.resolveComponentFactory(KnightComponent));
      } else if(this.pawnchees.pawnCheesType === IPawnCheesType.queen) {
        componentRef =this.pawnCheesView.createComponent<QueenComponent>(this.cfr.resolveComponentFactory(QueenComponent));
      } else if(this.pawnchees.pawnCheesType === IPawnCheesType.rook) {
        componentRef =this.pawnCheesView.createComponent<RookComponent>(this.cfr.resolveComponentFactory(RookComponent));
      }
      if(componentRef) {
        componentRef.instance.pawnchees = this.pawnchees;
      }
    });
  }

  isPair(): boolean {
    return (this.row + this.column) % 2 !== 0;
  }
}
