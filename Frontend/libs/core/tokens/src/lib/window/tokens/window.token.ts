import { InjectionToken } from "@angular/core";

export interface Window {
  readonly location: {
    href: string;
  }
}

export const WINDOW_TOKEN: InjectionToken<Window> = new InjectionToken<Window>('WindowToken');