import { Injectable, Inject, OnInit } from "@angular/core";
import { Http, RequestOptions, Response } from "@angular/http";
import { Headers } from '@angular/http'

import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

@Injectable()
export class SpotifyService {
    private searchUrl: string;
    private redirect_uri: string;
    acccessToken2: string;

    constructor(private http: Http,
    @Inject('TOKEN') private acccessToken: string) { 
        this.getToken();
    }

    searchTrack(str: string, type = "track") {
        this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.acccessToken);

        return this.http.get(this.searchUrl, { headers: headers })
            .map(res => res.json())
    };

    getToken(): void {
        this.http.get('http://localhost:8080/token')
        .subscribe((res: Response) => {
        this.acccessToken = res.text();
        });
    }
}