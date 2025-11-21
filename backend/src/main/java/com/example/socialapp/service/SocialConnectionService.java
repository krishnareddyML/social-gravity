package com.example.socialapp.service;

import com.example.socialapp.model.SocialConnection;
import com.example.socialapp.model.User;
import com.example.socialapp.repository.SocialConnectionRepository;
import com.example.socialapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SocialConnectionService {

    @Autowired
    private SocialConnectionRepository connectionRepository;

    @Autowired
    private UserRepository userRepository;

    public List<SocialConnection> getUserConnections(Long userId) {
        return connectionRepository.findByUserId(userId);
    }

    public SocialConnection connectPlatform(@NonNull Long userId, String platform) {
        // In a real app, this would involve OAuth flow
        // For this POC, we'll simulate a connection
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        SocialConnection connection = new SocialConnection();
        connection.setUser(user);
        connection.setPlatform(platform);
        connection.setConnected(true);
        connection.setPlatformUsername("mock_user_" + platform.toLowerCase());

        return connectionRepository.save(connection);
    }

    public void disconnectPlatform(@NonNull Long connectionId) {
        connectionRepository.deleteById(connectionId);
    }

    public SocialConnection saveTwitterConnection(Long userId, String accessToken, String tokenSecret,
            String platformUserId, String screenName) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Check if connection already exists
        SocialConnection connection = connectionRepository.findByUserIdAndPlatform(userId, "twitter")
                .orElse(new SocialConnection());

        connection.setUser(user);
        connection.setPlatform("twitter");
        connection.setAccessToken(accessToken);
        connection.setRefreshToken(tokenSecret); // Using refreshToken field for tokenSecret in OAuth1.0a
        connection.setPlatformUserId(platformUserId);
        connection.setPlatformUsername(screenName);
        connection.setConnected(true);

        return connectionRepository.save(connection);
    }
}
