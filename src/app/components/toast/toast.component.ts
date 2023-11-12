import {Component, inject, OnInit} from '@angular/core';
import {ToastService} from "../../services/toast.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        transform: 'translateX(100%)'
      })),
      state('*', style({
        transform: 'translateX(0)'
      })),
      transition('void => *', animate('300ms ease-out')),
      transition('* => void', animate('300ms ease-in'))
    ]),
  ]
})


export class ToastComponent {
  toastService = inject(ToastService);

  getHeader(type: "success" | "danger" | "") {
    if (type === 'success') return 'Success!';
    if (type === 'danger') return 'Error!';
    return '';
  }

  trackByFn(_: number, item: { id: number, message: string, type: 'success' | 'danger' | '' }) {
    return item.id;
  }

  hideToast(toast: { id: number; message: string; type: "success" | "danger" | '' }) {
    this.toastService.remove(toast as { id: number; message: string; type: "success" | "danger" });
  }
}
