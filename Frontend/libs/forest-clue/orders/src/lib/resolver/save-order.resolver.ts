import { inject, Injectable, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { of, Subject, switchMap, takeUntil } from "rxjs";
import { OrdersService } from "../services/orders.service";

@Injectable({
  providedIn: 'root'
})
export class SaveOrderResolver implements OnDestroy {

  private readonly _actiavtedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _ordersService: OrdersService = inject(OrdersService);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  resolve(): void {
    this._actiavtedRoute.queryParams.pipe(
      takeUntil(this._destroy$),
      switchMap((param) => {
        const sessionId = param['session_id'];

        if (sessionId) {
          return this._ordersService.checkoutSession(sessionId);
        }

        return of();
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}