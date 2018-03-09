import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class SpotifyService {
  static BASE_URL = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {
  }

  private getToken(): Observable<any> {
    return this.http.get('http://localhost:8080/token', {responseType: 'text'});
  }

  private query(URL: string, params?: Array<String>): Observable<any> {
    let queryURL = `${SpotifyService.BASE_URL}${URL}`;
    if (params) {
      queryURL = `${queryURL}?${params.join('&')}`;
    }
    return this.getToken()
      .mergeMap((token: string) => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.http.get(queryURL, {headers: headers});
      });
  }

  private search(query: string, type: string): Observable<any> {
    return this.query(`/search`, [`q=${query}`, `type=${type}`]);
  }

  searchTrack(str: string): Observable<any> {
    return this.search(str, 'track');
  }

  getTrack(id: string): Observable<any> {
    return this.query(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any> {
    return this.query(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<any> {
    return this.query(`/albums/${id}`);
  }


}
