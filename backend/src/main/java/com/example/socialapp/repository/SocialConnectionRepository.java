package com.example.socialapp.repository;

import com.example.socialapp.model.SocialConnection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SocialConnectionRepository extends JpaRepository<SocialConnection, Long> {
    List<SocialConnection> findByUserId(Long userId);
    Optional<SocialConnection> findByUserIdAndPlatform(Long userId, String platform);
}
