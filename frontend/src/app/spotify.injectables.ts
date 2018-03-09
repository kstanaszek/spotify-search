import { SpotifyService } from './spotify.service';

export const SPOTIFY_INJECTABLES: Array<any> = [
  {provide: SpotifyService, useClass: SpotifyService},
];
