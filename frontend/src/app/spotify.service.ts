import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class SpotifyService {
  private searchUrl: string;

  constructor(private http: Http) {
  }


  getToken(): Observable<string> {
    return this.http.get('http://localhost:8080/token').map((res: Response) => res.text());
  }

  searchTrack(str: string, type = 'track'): Observable<any> {
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
    const headers = new Headers();

    return this.getToken()
      .flatMap((token: string) => {
        headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.searchUrl, {headers: headers})
          .map(res => res.json());
      });
  }
}
