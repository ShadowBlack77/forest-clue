import { CommonModule } from "@angular/common";
import { Component, input, InputSignal } from "@angular/core";

@Component({
  selector: 'lib-auth-header',
  templateUrl: './auth-header.component.html',
  imports: [
    CommonModule
  ]
})
export class AuthHeaderComponent {
  
  readonly isMobile: InputSignal<boolean> = input<boolean>(false);
}