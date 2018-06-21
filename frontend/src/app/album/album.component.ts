import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  id: string;
  album: Object;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService,
              private location: Location) {
    route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.spotify
      .getAlbum(this.id)
      .subscribe(res => this.renderAlbum(res));
  }

  back(): void {
    this.location.back();
  }

  renderAlbum(res: any): void {
    this.album = res;
  }
}
