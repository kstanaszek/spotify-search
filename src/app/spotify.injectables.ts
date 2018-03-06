import { SpotifyService} from "./spotify.service";

const TOKEN = 'my token' 

export const SPOTIFY_INJECTABLES: Array<any> = [
    { provide: SpotifyService, useClass: SpotifyService },
    { provide: 'TOKEN', useValue: TOKEN },
];