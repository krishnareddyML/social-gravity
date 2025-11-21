package com.example.socialapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @GetMapping("/{userId}/summary")
    public ResponseEntity<Map<String, Object>> getAnalyticsSummary(@PathVariable Long userId) {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalPosts", 124);
        summary.put("scheduledPosts", 8);
        summary.put("totalEngagement", 15420);
        summary.put("engagementGrowth", "+12.5%");
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/{userId}/performance")
    public ResponseEntity<List<Map<String, Object>>> getPostPerformance(@PathVariable Long userId) {
        List<Map<String, Object>> performance = new ArrayList<>();

        Map<String, Object> p1 = new HashMap<>();
        p1.put("date", "2023-10-01");
        p1.put("views", 1200);
        p1.put("likes", 350);
        performance.add(p1);

        Map<String, Object> p2 = new HashMap<>();
        p2.put("date", "2023-10-02");
        p2.put("views", 1500);
        p2.put("likes", 420);
        performance.add(p2);

        Map<String, Object> p3 = new HashMap<>();
        p3.put("date", "2023-10-03");
        p3.put("views", 1100);
        p3.put("likes", 280);
        performance.add(p3);

        return ResponseEntity.ok(performance);
    }
}
