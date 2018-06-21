import {
  inject,
  fakeAsync,
  tick,
  TestBed
} from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
import { SpotifyService } from './spotify.service';
import { HttpClient } from '@angular/common/http';

describe('SpotifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        SpotifyService,
        {
          provide: HttpClient,
          useFactory: (backend: ConnectionBackend,
                       defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        },
      ]
    });
  });


  it('retrieves using the track ID2',
    inject([SpotifyService, MockBackend], fakeAsync((spotifyService, mockBackend) => {
      let res;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('https://api.spotify.com/v1/tracks/TRACK_ID');
        const response = new ResponseOptions({body: '{"name": "felipe"}'});
        c.mockRespond(new Response(response));
      });
      spotifyService.getTrack('TRACK_ID').subscribe((_res) => {
        res = _res;
      });
      tick();
      expect(res.name).toBe('felipe');
    })));
});
