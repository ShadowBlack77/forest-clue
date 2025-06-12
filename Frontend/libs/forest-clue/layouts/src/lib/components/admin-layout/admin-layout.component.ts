import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LogoutButtonComponent } from "@lib/auth";
import { AdminHeaderComponent } from "@lib/shared/header";

@Component({
  selector: 'lib-admin-layout',
  templateUrl: './admin-layout.component.html',
  imports: [
    RouterOutlet,
    AdminHeaderComponent,
    LogoutButtonComponent
  ]
})
export class AdminLayoutComponent {}