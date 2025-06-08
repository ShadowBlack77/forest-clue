import { CommonModule } from "@angular/common";
import { Component, input, InputSignal } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'lib-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class MobileNavComponent {
  
  readonly navMenuState: InputSignal<boolean> = input.required();
}