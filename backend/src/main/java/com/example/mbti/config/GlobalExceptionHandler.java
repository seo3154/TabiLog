// src/main/java/com/example/mbti/config/GlobalExceptionHandler.java
package com.example.mbti.config;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> onIllegalArgument(IllegalArgumentException e) {
        return Collections.singletonMap("message", e.getMessage()); // ✅ 자바8 대응
    }
}
