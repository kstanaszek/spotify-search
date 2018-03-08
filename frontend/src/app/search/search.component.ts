import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, RequestOptions, Response } from '@angular/http';

import { SpotifyService } from '../spotify.service';
import { HttpResponse } from 'selenium-webdriver/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string;
  results: Object;
  public token: string;

  constructor(private http: Http, private spotify: SpotifyService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route
      .queryParams
      .subscribe(params => { this.query = params['query'] || ''; });
  }

  getToken(): void {
    this.http.get('http://localhost:8080/token')
    .subscribe((res: Response) => {
    this.token = res.text();
    });
}

  search(): void {
    console.log('this.query', this.query);
    if (!this.query) {
      return;
    }
    this.spotify
      .searchTrack(this.query)
      .subscribe((res: any) => this.renderResults(res));
  }

  renderResults(res: any): void {
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }
  }

  submit(query: string): void {
    this.router.navigate(['search'], { queryParams: { query: query } })
      .then(_ => this.search());
  }

  ngOnInit() {
    this.search();
  }

}
