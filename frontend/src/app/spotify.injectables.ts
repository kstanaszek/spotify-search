import { SpotifyService} from "./spotify.service";
import { TOKEN } from './spotify.token'
 
export const SPOTIFY_INJECTABLES: Array<any> = [
    { provide: SpotifyService, useClass: SpotifyService },
    { provide: 'TOKEN', useValue: TOKEN },
];