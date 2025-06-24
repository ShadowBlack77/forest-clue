import { InjectionToken } from "@angular/core";

export interface EnvConfig {
  readonly apiUrl: string;
  readonly stripePublicKey: string;
}

export const ENV_TOKEN: InjectionToken<EnvConfig> = new InjectionToken<EnvConfig>('EnvToken');