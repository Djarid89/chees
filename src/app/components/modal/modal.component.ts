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

  ngOnDestroy(): void {
   this.showModalSub.unsubscribe();   
  }

  constructor(private readonly connector: ConnectorService) { }

  ngOnInit(): void {
    this.showModalSub = this.connector.showModal$.subscribe({
      next: (content: IModalContent) => {
        this.content = content;
      }
    });
  }

  close() {
    this.content = null;
  }
}
