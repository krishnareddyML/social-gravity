package com.example.socialapp.controller;

import com.example.socialapp.model.SocialConnection;
import com.example.socialapp.service.SocialConnectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/connections")
public class SocialConnectionController {

    @Autowired
    private SocialConnectionService connectionService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<SocialConnection>> getUserConnections(@PathVariable Long userId) {
        return ResponseEntity.ok(connectionService.getUserConnections(userId));
    }

    @PostMapping("/{userId}/connect")
    public ResponseEntity<SocialConnection> connectPlatform(@PathVariable @NonNull Long userId,
            @RequestParam String platform) {
        return ResponseEntity.ok(connectionService.connectPlatform(userId, platform));
    }

    @DeleteMapping("/{connectionId}")
    public ResponseEntity<?> disconnectPlatform(@PathVariable @NonNull Long connectionId) {
        connectionService.disconnectPlatform(connectionId);
        return ResponseEntity.ok().build();
    }

    @Autowired
    private com.example.socialapp.service.TwitterService twitterService;

    @GetMapping("/connect/twitter")
    public ResponseEntity<?> connectTwitter(@RequestParam Long userId) {
        try {
            String authUrl = twitterService.getAuthorizationUrl(String.valueOf(userId));
            return ResponseEntity.ok(authUrl);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error generating authorization URL: " + e.getMessage());
        }
    }

    @GetMapping("/callback/twitter")
    public ResponseEntity<Void> twitterCallback(@RequestParam Long userId,
            @RequestParam("oauth_token") String oauthToken,
            @RequestParam("oauth_verifier") String oauthVerifier) {
        try {
            com.github.scribejava.core.model.OAuth1AccessToken accessToken = twitterService
                    .getAccessToken(String.valueOf(userId), oauthVerifier);

            // In a real app, you'd fetch user profile from Twitter to get ID and ScreenName
            // For now, we'll just save the tokens and mock the ID/Name if not available in
            // token response
            // Note: ScribeJava AccessToken response often contains raw response with
            // screen_name and user_id

            String rawResponse = accessToken.getRawResponse();
            // Parse raw response or use a separate API call to verify credentials
            // For simplicity, we'll assume we can extract or mock them.
            // Actually, let's just save what we have.

            // Mocking extraction for POC as raw parsing depends on provider
            String platformUserId = "twitter_id_" + userId;
            String screenName = "twitter_user_" + userId;

            connectionService.saveTwitterConnection(userId, accessToken.getToken(), accessToken.getTokenSecret(),
                    platformUserId, screenName);

            return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND)
                    .location(java.net.URI.create("http://localhost:4200/dashboard/accounts"))
                    .build();
        } catch (Exception e) {
            // In case of error, redirect to accounts page with error param
            return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND)
                    .location(java.net.URI.create("http://localhost:4200/dashboard/accounts?error=true"))
                    .build();
        }
    }
}
