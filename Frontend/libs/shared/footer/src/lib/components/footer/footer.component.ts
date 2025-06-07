import { Component, signal, Signal } from "@angular/core";

@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  protected readonly currentYear: Signal<number> = signal(new Date().getFullYear());
}