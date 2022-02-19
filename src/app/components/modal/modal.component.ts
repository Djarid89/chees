import { identifierModuleUrl } from '@angular/compiler';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from 'src/app/service/connector.service';
import { IModalContent } from 'src/app/shared/interface/shared';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() content!: IModalContent | null;
  showModalSub!: Subscription;
  width!: string;
  height!: string;
  ttl!: number | null;
  showButton!: boolean;

  ngOnDestroy(): void {
   this.showModalSub.unsubscribe();   
  }

  constructor(private readonly connector: ConnectorService) { }

  ngOnInit(): void {
    this.showModalSub = this.connector.showModal$.subscribe({
      next: (content: IModalContent | null) => {
        this.content = content;
        this.width = content?.width ? `${content?.width}px` : '0';
        this.height = content?.height ? `${content?.height}px` : '0';
        this.ttl = content?.ttl || null;
        if(this.ttl !== null) {
          setTimeout(() => {
            this.content = null;
          }, this.ttl)
        }
        this.showButton = content?.showButton || false;
      }
    });
  }

  close() {
    this.content = null;
  }
}
