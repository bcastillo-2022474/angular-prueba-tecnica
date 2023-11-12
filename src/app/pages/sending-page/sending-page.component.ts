import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sending-page',
  templateUrl: './sending-page.component.html',
  styleUrls: ['./sending-page.component.scss']
})
export class SendingPageComponent implements OnInit {
  cost!: number;

  ngOnInit(): void {
  }

  showCost(cost: number) {
    this.cost = cost;
  }
}