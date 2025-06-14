import { CommonModule } from "@angular/common";
import { Component, inject, signal, WritableSignal } from "@angular/core";
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

  protected readonly isFormSubmitted: WritableSignal<boolean> = signal(false);
  protected readonly contactFormMessage: WritableSignal<string> = signal('');

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
      this.isFormSubmitted.set(true);

      this._contactFormService.send(this.contactForm.getRawValue()).pipe(
        take(1)
      ).subscribe({
        next: () => {
          this.isFormSubmitted.set(false);
          this.contactFormMessage.set('Thanks for contact!');
        },
        error: (err) => {
          this.contactFormMessage.set('Error occured while sending message!');
          this.isFormSubmitted.set(false);
        }
      });
    }
  }
}