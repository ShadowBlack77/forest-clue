import { animate, state, style, transition, trigger } from "@angular/animations";
import { AfterViewInit, Component, signal, Signal, WritableSignal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FeaturedProductsListComponent } from "@lib/forest-clue/products";
import { InViewportDirective } from "@lib/shared/animations";
import { interval, take } from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    RouterModule,
    FeaturedProductsListComponent,
    InViewportDirective
  ],
  animations: [
    trigger('fade-in-hero-nav', [
      state('hidden', style({
        opacity: 0,
        top: '12px'
      })),
      state('show', style({
        opacity: 1,
        top: '0px'
      })),
      transition('hidden => show', [
        animate('.5s ease-in')
      ])
    ]),
    trigger('fade-in-products', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s .25s ease-in')
      ])
    ]),
    trigger('fade-in-for-walk', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s .25s ease-in')
      ])
    ]),
    trigger('fade-in-for-ride', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s .25s ease-in')
      ])
    ])
  ]
})
export class HomePageComponent implements AfterViewInit {
  
  private readonly _heroText: Signal<string> = signal('EXPAND OUR HORIZONS');
  private readonly _heroTextSpeed: Signal<number> = signal(100);

  protected readonly displayWords: WritableSignal<string[][]> = signal([]);
  protected readonly heroNavState: WritableSignal<string> = signal('hidden');
  protected readonly productsListState: WritableSignal<string> = signal('hidden');
  protected readonly forWalkState: WritableSignal<string> = signal('hidden');
  protected readonly forRideState: WritableSignal<string> = signal('hidden');

  ngAfterViewInit(): void {
    this.heroNavState.set('show');

    const words = this._heroText().split(' ');
    const wordsWithLetters = words.map((word) => word.split(''));

    const flatChars = wordsWithLetters.flatMap((letters, wordIndex) => [
      ...letters.map((letter) => ({ letter, wordIndex })),
      { letter: '', wordIndex: -1 }
    ]);

    let result: string[][] = wordsWithLetters.map(() => []);

    interval(this._heroTextSpeed())
      .pipe(
        take(flatChars.length)
      ).subscribe((i) => {
        const { letter, wordIndex } = flatChars[i];

        if (letter === ' ') {
          return;
        }

        result[wordIndex].push(letter);

        this.displayWords.set([...result]);
      }
    )
  }

  productsListInViewport(): void {
    this.productsListState.set('show');
  }

  forWalkInViewport(): void {
    this.forWalkState.set('show');
  }

  forRideInViewport(): void {
    this.forRideState.set('show');
  }
}