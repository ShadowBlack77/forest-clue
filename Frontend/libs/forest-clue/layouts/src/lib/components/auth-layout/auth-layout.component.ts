import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'lib-auth-layout',
  templateUrl: './auth-layout.component.html',
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    RouterLink
  ]
})
export class AuthLayoutComponent {}