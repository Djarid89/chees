import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.scss']
})
export class HorizontalBarComponent implements OnInit {
  @Input() barItems: string[] | undefined;

  constructor() { }

  ngOnInit(): void {
    if(!this.barItems) {
      this.barItems = ['', '', '', '', '', '', '', ''];
    }
  }

}
