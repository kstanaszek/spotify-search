import { SpotifyService } from './services/spotify.service';

export const SPOTIFY_INJECTABLES: Array<any> = [
  {provide: SpotifyService, useClass: SpotifyService},
];
