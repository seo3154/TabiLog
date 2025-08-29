// src/main/java/com/example/mbti/repository/UserRepository.java
package com.example.mbti.repository;

import com.example.mbti.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUserid(String userid);

    boolean existsByNickname(String nickname);

    Optional<User> findByLoginId(String loginId);
}
