package com.github.spotifysearch;

import com.google.gson.Gson;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/")
public class AuthenticationController {
  private String CLIENT_ID = ""; // Your client id
  private String CLIENT_SECRET = ""; // Your secret

  class SpotifyToken {
    String access_token;
    String token_type;
    int expires_in;
    String scope;
  }


  @RequestMapping(method = RequestMethod.GET, value = "/token")
  public String getToken() throws Exception {
    CloseableHttpClient client = HttpClients.createDefault();
    HttpPost post = new HttpPost("https://accounts.spotify.com/api/token");
    post.setHeader(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded");
    post.setHeader(HttpHeaders.AUTHORIZATION, "Basic " + Base64.encodeBase64String((this.CLIENT_ID + ":" + this.CLIENT_SECRET).getBytes()));
    StringEntity data = new StringEntity("grant_type=client_credentials");
    post.setEntity(data);
    CloseableHttpResponse response = client.execute(post);
    String jsonStr = EntityUtils.toString(response.getEntity(), "UTF-8");
    Gson gson = new Gson();
    SpotifyToken spotifyToken = gson.fromJson(jsonStr, SpotifyToken.class);
    return spotifyToken.access_token;
  }
}

