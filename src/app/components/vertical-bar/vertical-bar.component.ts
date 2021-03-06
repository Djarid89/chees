import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vertical-bar',
  templateUrl: './vertical-bar.component.html',
  styleUrls: ['./vertical-bar.component.scss']
})
export class VerticalBarComponent implements OnInit {
  @Input() barItems: string[] | undefined;

  ngOnInit(): void {
    if(!this.barItems) {
      this.barItems = ['', '', '', '', '', '', '', ''];
    }
  }
}
