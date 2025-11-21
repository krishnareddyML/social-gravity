package com.example.socialapp.controller;

import com.example.socialapp.model.Post;
import com.example.socialapp.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/{userId}")
    public ResponseEntity<Post> createPost(@PathVariable @NonNull Long userId, @RequestBody @NonNull Post post) {
        return ResponseEntity.ok(postService.createPost(userId, post));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Post>> getUserPosts(@PathVariable Long userId) {
        return ResponseEntity.ok(postService.getUserPosts(userId));
    }
}
