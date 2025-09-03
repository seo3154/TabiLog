package com.example.mbti.controller;

import com.example.mbti.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users/{loginId}/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> list(@PathVariable String loginId) {
        List<Long> ids = bookmarkService.getTravelIds(loginId);
        Map<String, Object> body = new HashMap<>();
        body.put("items", ids);
        body.put("count", ids.size());
        return ResponseEntity.ok(body);
    }

    @GetMapping("/{travelId}/exists")
    public ResponseEntity<Map<String, Boolean>> exists(@PathVariable String loginId,
            @PathVariable Long travelId) {
        boolean exists = bookmarkService.exists(loginId, travelId);
        return ResponseEntity.ok(Collections.singletonMap("exists", exists));
    }

    @PostMapping("/{travelId}")
    public ResponseEntity<Void> add(@PathVariable String loginId, @PathVariable Long travelId) {
        bookmarkService.add(loginId, travelId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{travelId}")
    public ResponseEntity<Void> remove(@PathVariable String loginId, @PathVariable Long travelId) {
        bookmarkService.remove(loginId, travelId);
        return ResponseEntity.noContent().build();
    }
}
