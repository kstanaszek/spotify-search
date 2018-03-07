package com.github.spotifysearch;

import com.sun.deploy.net.HttpResponse;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

@Controller
@RequestMapping("/")
public class AuthenticationController {
  private RestTemplate restTemplate;

  @RequestMapping(method = RequestMethod.GET)
  public String getToken(){

  }

}
