import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from 'src/app/service/connector.service';
import { IModalContent } from 'src/app/shared/interface/shared';
import { PawnChees } from '../chees-box/class/chees-box';
import { Cheesboard } from '../chessboard/class/cheesBoard';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() content!: IModalContent | undefined;
  showModalSub!: Subscription;
  width!: string;
  height!: string;
  ttl!: number | null;
  showButton!: boolean;
  pawnCheesesToResurrect!: PawnChees[] | undefined;
  cheesboard!: Cheesboard | undefined;
  timeout: any;

  ngOnDestroy(): void {
   this.showModalSub.unsubscribe();
  }

  constructor(private readonly connector: ConnectorService) { }

  ngOnInit(): void {
    this.showModalSub = this.connector.showModal$.subscribe({
      next: (content: IModalContent | undefined) => {
        setTimeout(() => {  // trucchetto da sistemare meglio di così...
          this.content = content;
          this.width = content?.width ? `${content?.width}px` : '0';
          this.height = content?.height ? `${content?.height}px` : '0';
          this.ttl = content?.ttl || null;
          if(this.ttl && !this.timeout) {
            this.timeout = setTimeout(() => {
              this.content = undefined;
              this.timeout = null;
            }, this.ttl)
          }
          this.showButton = content?.showButton || false;
          this.pawnCheesesToResurrect = (content?.pawnCheesesToResurrect || []).map((pawn: PawnChees) => new PawnChees(pawn.type, pawn.color, pawn.firstMove));
          this.cheesboard = content?.cheesBoard;
        })
      }
    });
  }

  close() {
    this.content = undefined;
  }
}
