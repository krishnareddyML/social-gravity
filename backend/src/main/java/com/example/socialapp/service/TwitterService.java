package com.example.socialapp.service;

import com.github.scribejava.apis.TwitterApi;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuth1RequestToken;
import com.github.scribejava.core.oauth.OAuth10aService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class TwitterService {

    @Value("${twitter.api.key}")
    private String apiKey;

    @Value("${twitter.api.secret}")
    private String apiSecret;

    @Value("${twitter.callback.url}")
    private String callbackUrl;

    private OAuth10aService service;

    // In-memory store for request tokens (in production use Redis or DB)
    private final Map<String, OAuth1RequestToken> requestTokenStore = new HashMap<>();

    @PostConstruct
    public void init() {
        this.service = new ServiceBuilder(apiKey)
                .apiSecret(apiSecret)
                .callback(callbackUrl)
                .build(TwitterApi.instance());
    }

    public String getAuthorizationUrl(String userId) throws IOException, InterruptedException, ExecutionException {
        OAuth1RequestToken requestToken = service.getRequestToken();
        requestTokenStore.put(userId, requestToken); // Store token mapped to userId or session
        return service.getAuthorizationUrl(requestToken);
    }

    public OAuth1AccessToken getAccessToken(String userId, String oauthVerifier)
            throws IOException, InterruptedException, ExecutionException {
        OAuth1RequestToken requestToken = requestTokenStore.get(userId);
        if (requestToken == null) {
            throw new RuntimeException("Request token not found for user");
        }
        OAuth1AccessToken accessToken = service.getAccessToken(requestToken, oauthVerifier);
        requestTokenStore.remove(userId); // Clean up
        return accessToken;
    }
}
