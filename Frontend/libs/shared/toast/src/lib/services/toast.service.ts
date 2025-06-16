import { Injectable } from "@angular/core";
import { Toast } from "../models/toast.model";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  private toasts: Toast[] = [];

  show(toast: Toast) {
    this.toasts.push(toast);
  }

  remove(toast: Toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}