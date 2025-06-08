import { AfterViewInit, Component, output, OutputEmitterRef, signal, WritableSignal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  imports: [
    RouterModule,
  ],
  animations: [
    trigger('fade-in-header', [
      state('hidden', style({
        opacity: 0,
        top: '32px'
      })),
      state('show', style({
        opacity: 1,
        top: '0'
      })),
      transition('hidden => show', [
        animate('.5s ease-in')
      ])
    ])
  ]
})
export class HeaderComponent implements AfterViewInit {

  protected readonly navMenuToggleEmitter: OutputEmitterRef<boolean> = output<boolean>();
  protected readonly navMenuState: WritableSignal<boolean> = signal(false);
  protected readonly headerState: WritableSignal<string> = signal('hidden');

  ngAfterViewInit(): void {
    this.headerState.set('show');
  }

  toggleNavMenu(): void {
    this.navMenuState.update((prev) => !prev);
    this.navMenuToggleEmitter.emit(this.navMenuState());
  }
}