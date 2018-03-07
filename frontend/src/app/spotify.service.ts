import { Injectable, Inject } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { Headers } from '@angular/http'

import 'rxjs/Rx';

@Injectable()
export class SpotifyService {
    private searchUrl: string;
    private redirect_uri: string;

    constructor(private http: Http,
    @Inject('TOKEN') private acccessToken: string) { }

    searchTrack(str: string, type = "track") {
        this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.acccessToken);

        return this.http.get(this.searchUrl, { headers: headers })
            .map(res => res.json())
    };
}