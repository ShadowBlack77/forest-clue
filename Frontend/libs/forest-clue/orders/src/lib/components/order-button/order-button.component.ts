import { Component, inject } from "@angular/core";
import { OrdersService } from "../../services/orders.service";
import { take } from "rxjs";

@Component({
  selector: 'lib-orders-button',
  templateUrl: './order-button.component.html',
})
export class OrderButtonComponent {
  
  private readonly _ordersService: OrdersService = inject(OrdersService);

  takeOrder(): void {
    this._ordersService.paymentsSession().pipe(
      take(1)
    ).subscribe();
  }
}