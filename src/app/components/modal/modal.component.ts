import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from 'src/app/service/connector.service';
import { GraveyardAction, IModalContent, IUpgradeGraveyard } from 'src/app/shared/interface/shared';
import { PawnChees } from '../chees-box/class/chees-box';
import { Cheesboard } from '../chessboard/class/cheesBoard';
import { IPawnChees } from '../pawn-chees/interface/pawn-chees';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() content!: IModalContent | undefined;
  showModalSub!: Subscription;
  updateGraveyard!: Subscription;
  doResurrect!: Subscription;
  width!: string;
  height!: string;
  ttl!: number | null;
  showButton!: boolean;
  showGraveyard!: boolean;
  pawnCheesesToResurrect!: PawnChees[];
  graveyard!: PawnChees[];
  cheesboard!: Cheesboard | undefined;
  timeout: any;

  ngOnDestroy(): void {
   this.showModalSub.unsubscribe();
   this.updateGraveyard.unsubscribe();
   this.doResurrect.unsubscribe();
  }

  constructor(private readonly connector: ConnectorService) { }

  ngOnInit(): void {
    this.pawnCheesesToResurrect = [];

    this.doResurrect = this.connector.doResurrect$.subscribe({
      next: (pawnCheesToDelete: PawnChees) => {
        const index = this.pawnCheesesToResurrect.findIndex((pawnChees: PawnChees) => pawnCheesToDelete.color === pawnChees.color && pawnCheesToDelete.color === pawnChees.type);
        if(index !== -1) {
          this.pawnCheesesToResurrect.splice(index, 1);
        }
      }
    });
  

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
          this.showGraveyard = content?.showGraveyard?.show || false;
          this.graveyard = this.pawnCheesesToResurrect.filter((pawnChees: PawnChees) => pawnChees.color === content?.showGraveyard?.team);
          this.cheesboard = content?.cheesBoard;
        })
      }
    });

    this.updateGraveyard = this.connector.updateGraveyard$.subscribe({
      next: (updateGraveyard: IUpgradeGraveyard) => {
        if(updateGraveyard.action === GraveyardAction.push) {
          this.pawnCheesesToResurrect.push(updateGraveyard.pawnChees);
        } else {
          this.pawnCheesesToResurrect.pop();
        }
      }
    })
  }

  close() {
    this.content = undefined;
  }
}
