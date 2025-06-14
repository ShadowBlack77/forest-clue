import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactFormService } from "../../services/contact-form.service";
import { take } from "rxjs";

@Component({
  selector: 'lib-contact-form',
  templateUrl: './contact-form.component.html',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ContactFormComponent {

  private readonly _contactFormService: ContactFormService = inject(ContactFormService);

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
      this._contactFormService.send(this.contactForm.getRawValue()).pipe(
        take(1)
      ).subscribe({
        next: () => {
          console.log('SEND!');
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}