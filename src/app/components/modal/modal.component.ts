import { identifierModuleUrl } from '@angular/compiler';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from 'src/app/service/connector.service';
import { IModalContent } from 'src/app/shared/interface/shared';
import { PawnChees } from '../chees-box/class/chees-box';
import { Cheesboard } from '../chessboard/class/cheesBoard';
import { IPawnCheesType } from '../pawn-chees/interface/pawn-chees';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @Input() content!: IModalContent | undefined;
  showModalSub!: Subscription;
  width!: string;
  height!: string;
  ttl!: number | null;
  showButton!: boolean;
  graveyard!: PawnChees[] | undefined;
  cheesboard!: Cheesboard | undefined;

  ngOnDestroy(): void {
   this.showModalSub.unsubscribe();   
  }

  constructor(private readonly connector: ConnectorService) { }

  ngAfterViewInit() {
    this.showModalSub = this.connector.showModal$.subscribe({
      next: (content: IModalContent | undefined) => {
        this.content = content;
        this.width = content?.width ? `${content?.width}px` : '0';
        this.height = content?.height ? `${content?.height}px` : '0';
        this.ttl = content?.ttl || null;
        if(this.ttl !== null) {
          setTimeout(() => {
            this.content = undefined;
          }, this.ttl)
        }
        this.showButton = content?.showButton || false;
        this.graveyard = content?.graveyard?.pawnCheeses.filter((pawnchees: PawnChees) => pawnchees.type !== IPawnCheesType.pawn && pawnchees.color === content.graveyard?.color)
          .map((pawnchees: PawnChees) => new PawnChees(pawnchees.type, pawnchees.color, pawnchees.doubleMove));
        this.cheesboard = content?.cheesBoard;
      }
    });
  }

  close() {
    this.content = undefined;
  }
}
