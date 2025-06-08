import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'lib-contact-form',
  templateUrl: './contact-form.component.html',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ContactFormComponent {

  protected readonly contactForm: FormGroup = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    })
  });

  submit(): void {
    if (this.contactForm.valid) {
      
    }
  }
}