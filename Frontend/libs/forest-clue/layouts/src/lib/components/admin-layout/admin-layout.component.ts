import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'lib-admin-layout',
  templateUrl: './admin-layout.component.html',
  imports: [
    RouterOutlet
  ]
})
export class AdminLayoutComponent {}