import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {wait} from "../../constants";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-sending-page',
  templateUrl: './sending-page.component.html',
  styleUrls: ['./sending-page.component.scss']
})
export class SendingPageComponent implements OnInit {
  authService = inject(AuthService)
  toastService = inject(ToastService)
  cost!: number;
  user$ = this.authService.currentUser$

  ngOnInit(): void {
  }

  showCost(cost: number) {
    this.cost = cost;
  }

  logout() {
    this.authService.logout()
    wait(0.7).then(() => {
      this.toastService.show('Ha salido de su cuenta exitosamente!')
    })
  }

}
