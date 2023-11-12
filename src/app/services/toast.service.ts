import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _show = new Subject<{ message: string, type: 'success' | 'danger' }>();
  show$ = this._show.asObservable();

  private _messages = new BehaviorSubject<{ id: number, message: string, type: 'success' | 'danger' }[]>([]);
  messages$ = this._messages.asObservable();
  private messages: { id: number, message: string, type: 'success' | 'danger' }[] = [];

  private idCounter = 0;

  show(message: string, type: 'success' | 'danger' = 'success') {
    const toast = {message, type, id: this.idCounter++};
    this.messages.push(toast);
    this._messages.next(this.messages);
    this._show.next(toast);
    setTimeout(() => this.remove(toast), 5000);
  }

  remove(toast: { id: number, message: string, type: 'success' | 'danger' }) {
    this.messages = this.messages.filter(t => t.id !== toast.id);
    this._messages.next(this.messages);
  }
}
