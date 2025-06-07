import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthHeaderComponent } from "@lib/auth";
import { FooterComponent } from "@lib/shared/footer";
import { HeaderComponent } from "@lib/shared/header";

@Component({
  selector: 'lib-root-layout',
  templateUrl: './root-layout.component.html',
  imports: [
    RouterOutlet,
    HeaderComponent,
    AuthHeaderComponent,
    FooterComponent
  ]
})
export class RootLayoutComponent {}