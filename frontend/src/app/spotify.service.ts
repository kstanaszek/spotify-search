import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class SpotifyService {
  private searchUrl: string;

  constructor(private http: HttpClient) {
  }

  getToken(): Observable<any> {
    return this.http.get('http://localhost:8080/token', {responseType: 'text'});
  }

  searchTrack(str: string, type = 'track'): Observable<any> {
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
    return this.getToken()
      .mergeMap((token: string) => {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        });
        return this.http.get(this.searchUrl, {headers: headers});
      });
  }
}
