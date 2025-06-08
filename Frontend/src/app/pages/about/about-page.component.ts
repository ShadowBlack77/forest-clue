import { Component } from "@angular/core";
import { ContactFormComponent } from "@lib/forest-clue/contact-form";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  imports: [
    ContactFormComponent
  ]
})
export class AboutPageComponent {

}