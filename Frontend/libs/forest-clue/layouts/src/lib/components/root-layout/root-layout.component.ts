import { Component, signal, WritableSignal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthHeaderComponent } from "@lib/auth";
import { FooterComponent } from "@lib/shared/footer";
import { HeaderComponent, MobileNavComponent } from "@lib/shared/header";

@Component({
  selector: 'lib-root-layout',
  templateUrl: './root-layout.component.html',
  imports: [
    RouterOutlet,
    HeaderComponent,
    AuthHeaderComponent,
    MobileNavComponent,
    FooterComponent
  ]
})
export class RootLayoutComponent {

  protected readonly navMenuState: WritableSignal<boolean> = signal<boolean>(false);

  handleToggleMenu(state: boolean): void {
    this.navMenuState.set(state);
  }
}