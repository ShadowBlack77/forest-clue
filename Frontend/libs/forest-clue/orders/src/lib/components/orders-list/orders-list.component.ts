import { Component, inject } from "@angular/core";
import { OrdersService } from "../../services/orders.service";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { OrderModel } from "../../models/order.model";

@Component({
  selector: 'lib-orders-list',
  templateUrl: './orders-list.component.html',
  imports: [
    CommonModule
  ]
})
export class OrdersListComponent {

  private readonly _ordersService: OrdersService = inject(OrdersService);

  protected readonly orders$: Observable<OrderModel[]> = this._ordersService.getAllUserOrders();
}